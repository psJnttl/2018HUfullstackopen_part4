const dummy = (blogs) => {
  return 1;
}

const total_likes = (blogs) => {
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
}

const favorite_blog = (blogs) => {
  if (!blogs || blogs.length === 0) {
    return null;
  }
  const copyBlogs = blogs.map(b => b);
  const likes = copyBlogs.sort((a, b) => {
    return b.likes - a.likes;
  });
  return likes[0];
}

module.exports = {
  dummy,
  total_likes,
  favorite_blog
}
