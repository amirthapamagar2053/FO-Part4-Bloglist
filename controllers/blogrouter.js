const blogRouter = require("express").Router();
const Blog = require("../models/blog");

blogRouter.get("/", async (request, response) => {
  const blog = await Blog.find({});
  response.json(blog);
});

blogRouter.post("/", (request, response) => {
  const blog = new Blog(request.body);

  Blog.save().then((result) => {
    response.status(201).json(result);
  });
});

module.exports = blogRouter;
