import { connectBlogs, generatorBlogs } from "./blogs.js";

const getAllBlogs = async () => {
  try {
    const responsive = await connectBlogs();
    generatorBlogs(responsive);
  } catch (error) {
    console.log(error);
  }
};

getAllBlogs();
