const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.get("/", async (request, response, next) => {
  const result = await User.find({}).populate("blogs");
  response.status(200).json(result);
});

usersRouter.post("/", async (request, response, next) => {
  const { username, name, password } = request.body;
  if (!username || !password || username.length < 3 || password.length < 3) {
    return response
      .status(400)
      .json({
        error: "Invalid format username and password must be given",
      })
      .end();
  }
  const matchUsername = User.find({ username: username });

  if (!matchUsername.length) {
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);
    const user = new User({
      username,
      name,
      passwordHash,
    });
    const savedUser = await user.save();
    response.status(201).json(savedUser);
  } else {
    response.status(400).json({ error: "Name should be unique" }).end();
  }
});

module.exports = usersRouter;
