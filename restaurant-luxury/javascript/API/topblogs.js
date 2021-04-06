import { connectBlogs, generatorBlogs } from "../API/blogs.js";

const getTopBlogs = async () => {
  try {
    const responsive = await connectBlogs();

    generatorBlogs(topBlogs(responsive));
  } catch (error) {
    console.log(error);
  }
};

const topBlogs = function (blogs = []) {
  if (blogs.length < 0) return;
  const arr = blogs.sort((blog1, blog2) => new Date(blog2.created).getTime() - new Date(blog1.created).getTime());
  generatorBlogs(arr.slice(0, 5));
};

getTopBlogs();
