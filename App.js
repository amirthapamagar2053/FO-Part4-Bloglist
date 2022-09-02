const http = require('http')
const express = require('express')
const App = express()
const cors = require('cors')
const blogRouter = require('./controllers/blogrouter')
const mongoose = require('mongoose')

require("dotenv").config();

const mongoUrl = process.env.MONGODB_URI;

console.log("connecting to", mongoUrl);

mongoose
  .connect(mongoUrl)
  // eslint-disable-next-line
  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

App.use(cors())
App.use(express.json())

App.use("/api/blogs",blogRouter)
