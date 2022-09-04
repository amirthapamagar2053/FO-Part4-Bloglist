const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  if (blogs.length === 1) {
    return blogs[0].likes;
  } else {
    let totallike = 0;
    totallike = blogs.reduce((sum, blogs) => sum + blogs.likes, 0);
    return totallike;
  }
};

const favoriteBlog = (blogs) => {
  let blogLikesarr = blogs.map((blog) => blog.likes);
  const index = blogLikesarr.indexOf(Math.max(...blogLikesarr));
  return blogs[index];
};

const mostBlogs = (blogs) => {
  let highestauthor = blogs.reduce((previousValue, currValue) => {
    if (Object.keys(previousValue).includes(currValue.author)) {
      return {
        ...previousValue,
        [currValue.author]: previousValue[currValue.author] + 1,
      };
    } else {
      return { ...previousValue, [currValue.author]: 1 };
    }
  }, {});
  let author = Object.keys(highestauthor).reduce((a, b) =>
    highestauthor[a] > highestauthor[b] ? a : b
  );
  return {
    author: author,
    blogs: highestauthor[author],
  };
};

const mostLikes = (blogs) => {
  let highestauthor = blogs.reduce((previousValue, currValue) => {
    if (Object.keys(previousValue).includes(currValue.author)) {
      return {
        ...previousValue,
        [currValue.author]: previousValue[currValue.author] + currValue.likes,
      };
    } else {
      return { ...previousValue, [currValue.author]: currValue.likes };
    }
  }, {});
  let author = Object.keys(highestauthor).reduce((a, b) =>
    highestauthor[a] > highestauthor[b] ? a : b
  );
  return {
    author: author,
    likes: highestauthor[author],
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
