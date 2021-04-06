const Carousel = document.querySelector(".carousel");
const carouselItems = Carousel.querySelectorAll(".carousel-item");
const carouselLen = carouselItems.length;

let currentItem = 0;
let translateX = 100 / carouselLen;
let step = 1;
Carousel.style.width = `${carouselLen * 100}%`;

const timeStart = Date.now();

const interval = setInterval(() => {
  currentItem = currentItem + step;

  if (currentItem >= carouselLen) {
    step = step * -1;
    currentItem = currentItem + step;
  }

  if (currentItem == 0) {
    step = Math.abs(step);
  }

  Carousel.style.transform = `translateX(-${translateX * currentItem}%)`;
}, 5000);
