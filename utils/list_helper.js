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


module.exports = {
  dummy,
  total_likes
}
