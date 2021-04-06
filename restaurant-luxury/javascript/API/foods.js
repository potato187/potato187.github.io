import { Foods } from "../API/index.js";

const connect = () =>
  new Promise((resolve) =>
    setTimeout(() => {
      resolve(Foods);
    }, 1000)
  );

const apiFoods = async () => {
  try {
    const responsive = await connect();
    generatorFoods(responsive, document.querySelector("#main-menu"));
  } catch (error) {
    console.log(error);
  }
};

function generatorFoods(arr = [], parent) {
  if (arr.length == 0) return;

  const fragment = new DocumentFragment();
  const template = document.querySelector("#template-menu").content.firstElementChild;
  arr.forEach((item) => {
    fragment.appendChild(generatorFood(item, template));
  });
  return parent.appendChild(fragment);
}

function generatorFood({ name, url, balance } = {}, template) {
  template.querySelector(".card-header").style.backgroundImage = `url(${url})`;
  template.querySelector(".card-main > h3").textContent = name;
  template.querySelector(".card-main > .currency").textContent = `${balance}.00`;
  return template.cloneNode(true);
}

apiFoods();
