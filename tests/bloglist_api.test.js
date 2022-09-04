const mongoose = require("mongoose");
const supertest = require("supertest");
const App = require("../App");
const Blog = require("../models/blog");
const api = supertest(App);
const blogHelper = require("./blogs_helper");

describe("Http Get Requests", () => {
  beforeEach(async () => {
    await Blog.deleteMany({});

    let Bloglist = new Blog(blogHelper.blogs[0]);
    await Bloglist.save();

    Bloglist = new Blog(blogHelper.blogs[1]);
    await Bloglist.save();
  });
  test("Correct number of blogs length through GET Request", async () => {
    const response = await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(response.body).toHaveLength(blogHelper.blogs.length);
  }, 10000);

  test("Presence of id in Bloglist", async () => {
    const response = await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(response.body[0].id).toBeDefined();
  }, 10000);

  test("Blog created through POST request", async () => {
    const newBlog = {
      title: "Go To Statement Considered Harmful Second",
      author: "Edsger W. Dijkstra Second",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html2",
      likes: 5,
    };

    const response = await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);
    const blogsAtEnd = await blogHelper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(blogHelper.blogs.length + 1);

    const contents = blogsAtEnd.map((n) => n.title);
    expect(contents).toContain("Go To Statement Considered Harmful Second");
  }, 10000);

  afterAll(() => {
    mongoose.connection.close();
  });
});
