const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.get("/", async (request, response, next) => {
  const result = await User.find({}).populate("blogs");
  response.status(200).json(result);
});

usersRouter.post("/", async (request, response, next) => {
  const { username, name, password } = request.body;
  console.log("the bodt is", request.body);
  if (!username && !password && username.length < 3 && password.length < 3) {
    response
      .status(400)
      .json({ error: "Invalid format username and password must be given" });
  }
  if (User.find({ username: username })) {
    response.status(400).json({ error: "Name should be unique" }).end();
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);
  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();

  response.status(201).json(savedUser);
});

module.exports = usersRouter;
