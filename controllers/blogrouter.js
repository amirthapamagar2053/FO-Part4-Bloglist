const blogRouter = require("express").Router();
const Blog = require("../models/blog");

blogRouter.get("/", async (request, response) => {
  console.log("the get entered");
  const blog = await Blog.find({});
  response.json(blog);
});

blogRouter.post("/", async (request, response) => {
  if (!request.body.likes) {
    request.body = { ...request.body, likes: 0 };
  }
  if (!request.body.title || !request.body.url) {
    console.log("the error 400 entered");
    response.status(400).json({ error: "the 400 error occured" });
  } else {
    // console.log("the request.body is", request.body);
    let blog = new Blog(request.body);
    const newBlog = await blog.save();
    // console.log("the newblog is", newBlog);
    response.status(201).json(newBlog);
  }
});

module.exports = blogRouter;
