const http = require("http");
const express = require("express");
const App = express();
// const cors = require("cors");
const blogRouter = require("./controllers/blogrouter");
const mongoose = require("mongoose");
const { info, error } = require("./utils/logger");
const { MONGODB_URI, PORT } = require("./utils/config");
const usersRouter = require("./controllers/userrouter");
const loginRouter = require("./controllers/loginrouter");
const middleware = require("./utils/middleware");

require("dotenv").config();

const mongoUrl = MONGODB_URI;

console.log("connecting to", mongoUrl);

mongoose
  .connect(mongoUrl)
  // eslint-disable-next-line
  .then((result) => {
    info("connected to MongoDB");
  })
  .catch((error) => {
    info("error connecting to MongoDB:", error.message);
  });

// App.use(cors());
App.use(express.json());
App.use(middleware.tokenExtractor);
App.use(middleware.userExtractor);
App.use("/api/login", loginRouter);
App.use("/api/blogs", blogRouter);
App.use("/api/users", usersRouter);

module.exports = App;
