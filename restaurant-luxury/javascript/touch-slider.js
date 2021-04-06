let touchSlider = null,
  sliderItems = null,
  startPos = null,
  isDragging = false,
  currentTranslate = 0,
  prevTranslate = 0,
  animationID = 0,
  currentIndex = 0;

window.addEventListener("load", function () {
  touchSlider = document.querySelector(".touch-slider-wrapper");
  sliderItems = touchSlider.querySelectorAll(".touch-slider");

  sliderItems.forEach((slider, index) => {
    const image = slider.querySelector("img");
    image.addEventListener("dragstart", (event) => event.preventDefault());

    slider.addEventListener("touchstart", touchStart(index));
    slider.addEventListener("touchmove", touchMove);
    slider.addEventListener("touchend", touchEnd);

    slider.addEventListener("mousedown", touchStart(index));
    slider.addEventListener("mouseup", touchEnd);
    slider.addEventListener("mouseleave", touchEnd);
    slider.addEventListener("mousemove", touchMove);
  });

  function touchStart(index) {
    return function (event) {
      currentIndex = index;
      startPos = getPositionX(event);
      isDragging = true;
      animationID = requestAnimationFrame(animation);
      touchSlider.classList.add("grabbing");
    };
  }

  function touchMove(event) {
    if (isDragging) {
      const currentPosition = getPositionX(event);
      currentTranslate = prevTranslate + currentPosition - startPos;
    }
  }

  function touchEnd() {
    isDragging = false;
    cancelAnimationFrame(animation);

    const moveBy = currentTranslate - prevTranslate;
    if (moveBy < -100 && currentIndex < sliderItems.length - 1) {
      currentIndex += 1;
    }

    if (moveBy > 100 && currentIndex > 0) {
      currentIndex -= 1;
    }

    setPositionByIndex();
    touchSlider.classList.remove("grabbing");
  }
});

function getPositionX(event) {
  return event.type.includes("mouse") ? event.pageX : event.touches[0].clientX;
}

function animation() {
  setSliderPosition();
  if (isDragging) {
    requestAnimationFrame(animation);
  }
}

function setSliderPosition() {
  return (touchSlider.style.transform = `translateX(${currentTranslate}px)`);
}

function setPositionByIndex() {
  currentTranslate = currentIndex * window.innerWidth * -1;
  prevTranslate = currentTranslate;
  setSliderPosition();
}
