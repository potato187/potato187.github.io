import { Blogs } from "./index.js";
import appearOnScroll from "../appearOnScroll.js";

const connectBlogs = () =>
  new Promise((resolve) =>
    setTimeout(() => {
      resolve(Blogs);
    }, 1000)
  );

const generatorBlogs = (arrBlogs = []) => {
  if (arrBlogs.length <= 0) return;
  const fragment = new DocumentFragment();
  arrBlogs.forEach((blog) => {
    fragment.appendChild(generatorBlog(blog));
  });
  fragment.querySelectorAll('[class*="am-"]').forEach((blog) => appearOnScroll.observe(blog));
  document.querySelector("#blogs").appendChild(fragment);
};

function generatorBlog({ created, avatar, title, intro, author, url } = {}) {
  const template = document.querySelector("#template-blog").content.firstElementChild;

  template.querySelector("img").src = avatar;
  template.querySelector("img").alt = author;

  const time = template.querySelector("time");
  time.setAttribute("datetime", created);
  time.textContent = formatDate(created); // yy mm dd
  template.querySelector("h2 > a").textContent = title;
  template.querySelector("h2 > a").href = url;
  template.querySelector("p").textContent = intro;

  return template.cloneNode(true);
}

const nth = function (d) {
  if (d > 3 || d < 21) return "th";
  switch (d % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};

const moth = function (m) {
  if (m < 0 || m > 12) return;
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  return months[m];
};

function formatDate(date) {
  const d = new Date(date);
  return `${d.getUTCDate() + nth(d.getUTCDate())} ${moth(d.getUTCMonth())} ${d.getUTCFullYear()}`;
}

export { connectBlogs, generatorBlogs };
