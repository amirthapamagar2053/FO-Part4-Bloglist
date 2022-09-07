const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");

blogRouter.get("/", async (request, response) => {
  console.log("the get entered");
  const blog = await Blog.find({}).populate("user");
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
    const user = await User.findById(request.body.userId);
    console.log("The post user is", user);

    const blog = new Blog({
      title: request.body.title,
      author: request.body.author,
      url: request.body.url,
      likes: request.body.likes,
      user: user._id,
    });

    const newBlog = await blog.save();
    console.log("the newBlog is ", newBlog);
    user.blogs = user.blogs.concat(newBlog._id);
    await user.save();
    response.status(201).json(newBlog);
  }
});

blogRouter.delete("/:id", async (request, response) => {
  console.log("the delete entered");
  const blog = await Blog.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

blogRouter.put("/:id", async (request, res, next) => {
  const body = request.body;
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };

  let updatedblog = await Blog.findByIdAndUpdate(
    request.params.id,
    blog,
    { new: true } /*for validation*/
  );
  updatedblog !== null ? res.send(updatedblog) : res.send("error");
});

module.exports = blogRouter;
