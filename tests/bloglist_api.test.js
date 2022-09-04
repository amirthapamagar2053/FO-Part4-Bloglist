const mongoose = require("mongoose");
const supertest = require("supertest");
const App = require("../App");
const Blog = require("../models/blog");
const api = supertest(App);

describe("Http Get Requests", () => {
  const blogs = [
    {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0,
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0,
    },
  ];
  beforeEach(async () => {
    await Blog.deleteMany({});

    let Bloglist = new Blog(blogs[0]);
    await Bloglist.save();

    Bloglist = new Blog(blogs[1]);
    await Bloglist.save();
  });
  test("Correct number of blogs length", async () => {
    const response = await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(response.body).toHaveLength(blogs.length);
  }, 10000);

  test("Correct number of blogs length", async () => {
    const response = await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(response.body[0].id).toBeDefined();
  }, 10000);

  afterAll(() => {
    mongoose.connection.close();
  });
});
