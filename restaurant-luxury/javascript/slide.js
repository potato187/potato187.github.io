const Slides = document.querySelector(".slides");
const Sliders = Slides.querySelectorAll(".slider");
const sliderPrev = Slides.querySelector(".slider-prev");
const sliderNext = Slides.querySelector(".slider-next");
const sliderCircles = Slides.querySelectorAll(".circle");

let currentSlider = 0;

sliderPrev.addEventListener("click", (event) => {
  event.preventDefault();
  currentSlider--;
  if (currentSlider < 0) {
    currentSlider = Sliders.length - 1;
  }

  sliderActive(currentSlider);
  sliderCirclesActive(currentSlider);
});

sliderNext.addEventListener("click", (event) => {
  event.preventDefault();
  currentSlider++;
  if (currentSlider > Sliders.length - 1) {
    currentSlider = 0;
  }

  sliderActive(currentSlider);
  sliderCirclesActive(currentSlider);
});

sliderCircles.forEach((circle, index) => {
  circle.addEventListener("click", () => {
    currentSlider = index;
    sliderActive(currentSlider);
    sliderCirclesActive(currentSlider);
  });
});

function sliderActive(currentSlider) {
  Sliders.forEach((slider, index) => {
    if (currentSlider == index) {
      slider.classList.add("active");
    } else {
      slider.classList.remove("active");
    }
  });
}

function sliderCirclesActive(currentSlider) {
  sliderCircles.forEach((circle, index) => {
    if (currentSlider == index) {
      circle.classList.add("checked");
    } else {
      circle.classList.remove("checked");
    }
  });
}
