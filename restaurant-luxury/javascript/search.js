import { connectBlogs, generatorBlogs } from "./API/blogs.js";

const searchInput = document.querySelector("#search");
const searchSubmit = document.querySelector(".form-submit");

searchSubmit.addEventListener("click", (e) => e.preventDefault());

searchInput.addEventListener("keyup", (e) => {
  debounceSearch(e.target.value);
});

function debounce(fn, delay) {
  return (args) => {
    clearTimeout(fn.id);

    fn.id = setTimeout(() => {
      fn.call(this, args);
    }, delay);
  };
}

async function searchBlogs(key) {
  try {
    if (key.length == 0) return;
    const responsive = await connectBlogs();
    const blogs = find(responsive, key);
    clearBlogs();
    clearSearchInput();
    generatorBlogs(blogs);
  } catch (error) {
    console.log(error);
  }
}

function find(blogs = [], key) {
  return blogs.filter((blog) => findByText(blog.title, key) || findByText(blog.intro, key));
}

function clearBlogs() {
  const parent = document.querySelector("#blogs");
  while (parent.lastElementChild) {
    parent.removeChild(parent.lastElementChild);
  }
}

function clearSearchInput() {
  searchInput.value = "";
}

function findByText(text, key) {
  return text.toLowerCase().includes(key.toLowerCase());
}

const debounceSearch = debounce(searchBlogs, 300);
