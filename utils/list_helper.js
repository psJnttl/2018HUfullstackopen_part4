const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  if (!blogs || blogs.length === 0) {
    return 0;
  }
  const likeArray = blogs.map((b) => {
    return b.likes;
  });
  let sum = likeArray.reduce((sum, l) => {
    return sum + l;
  });
  return sum;
};

const favoriteBlog = (blogs) => {
  if (!blogs || blogs.length === 0) {
    return null;
  }
  const copyBlogs = blogs.map(b => b);
  const likes = copyBlogs.sort((a, b) => {
    return b.likes - a.likes;
  });
  return likes[0];
};

const mostBlogs = (blogs) => {
  if (!blogs || blogs.length === 0) {
    return null;
  }
  let authors = [];
  for (let i = 0; i < blogs.length; i++) {
    let author = blogs[i].author;
    let hit = authors.find((a) => {
      return author === a.author;
    });
    if (hit) {
      hit.blogs += 1;
    }
    else {
      authors.push({author: blogs[i].author, blogs: 1});
    }
  }
  authors.sort((a, b) => {
    return b.blogs - a.blogs;
  });
  return authors[0];
};

const mostLikes = (blogs) => {
  if (!blogs || blogs.length === 0) {
    return null;
  }
  let authors = [];
  for (let i = 0; i < blogs.length; i++) {
    let author = blogs[i].author;
    let hit = authors.find((a) => {
      return author === a.author;
    });
    if (hit) {
      hit.likes += blogs[i].likes;
    }
    else {
      authors.push({author: blogs[i].author, likes: blogs[i].likes});
    }
  }
  authors.sort((a, b) => {
    return b.likes - a.likes;
  });
  return authors[0];
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
};
