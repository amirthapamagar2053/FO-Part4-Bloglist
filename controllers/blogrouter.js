const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

//without using middleware
// const getTokenFrom = (request) => {
//   const authorization = request.get("authorization");
//   if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
//     return authorization.substring(7);
//   }
//   return null;
// };

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
    // console.log(request.body);
    // console.log(request);
    // Without using middleware
    // const token = getTokenFrom(request);
    // const decodedToken = jwt.verify(token, process.env.SECRET);

    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    if (!decodedToken.id) {
      return response.status(401).json({ error: "token missing or invalid" });
    }
    // const user = await User.findById(decodedToken.id); // Without using userExtractor middleware
    // const user = await User.findById(request.body.userId);
    const user = request.user;

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
    // newBlog.user = user; //Used for filter method in Frontend
    response.status(201).json(newBlog);
  }
});

blogRouter.delete("/:id", async (request, response) => {
  console.log("the delete entered");
  try {
    // const decodedToken = jwt.verify(request.token, process.env.SECRET); // Needed without using middleware

    // if (!decodedToken.id) {
    //   return response.status(401).json({ error: "token missing or invalid" });
    // }
    // const blog = await Blog.findByIdAndRemove(request.params.id);Without using token
    let blog = await Blog.findById(request.params.id);
    console.log("The blog user is", blog.user.toString());

    // if (decodedToken.id === blog.user.toString()) //Used if not using middleware
    if (request.user.id.toString() === blog.user.toString()) {
      const blog = await Blog.findByIdAndRemove(request.params.id);
      response.status(204).end();
    } else {
      return response
        .status(401)
        .json({ error: "in else token missing or invalid" });
    }
  } catch {
    return response
      .status(401)
      .json({ error: " in catch token missing or invalid" });
  }
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
