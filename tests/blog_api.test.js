const supertest = require('supertest');
const { app, server } = require('../index');
const api = supertest(app);
const Blog = require('../models/blog');
const {initialBlogs, getAllBlogs} = require('./test_helper');

describe('GET /api/blogs', () => {

  beforeAll(async () => {
    await Blog.remove({});

    const blogObjects = initialBlogs.map(b => new Blog(b));
    const promiseArray = blogObjects.map(b => b.save());
    await Promise.all(promiseArray);
  });

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('correct number of blogs listed', async () => {
    const response = await api
      .get('/api/blogs');
    const actualBlogs = await getAllBlogs();
    expect(response.body.length).toBe(actualBlogs.length);
  });

  test('there is a blog about emotions', async () => {
    const actualBlogs = await getAllBlogs();
    const response = await api
      .get('/api/blogs');
    const titles = response.body.map((b) => {
      return b.title;
    });
    const actualBlog = actualBlogs.find((b) => {
      return b.title === 'Tunnista tekotunteet.';
    });
    expect(titles).toContain(actualBlog.title);
  });
});

describe('POST /api/blogs', () => {

  beforeEach(async () => {
    await Blog.remove({});
    const blogObjects = initialBlogs.map(b => new Blog(b));
    const promiseArray = blogObjects.map(b => b.save());
    await Promise.all(promiseArray);
  });

  test('blog can be added', async () => {
    const newBlog = {
      title: 'Jalkapallon tekoanalyysit',
      author: 'Hannes Rinta-Räyhä',
      url: '127.0.0.1/',
      likes: 0
    };
    const blogsBeforeAdd = await getAllBlogs();
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);
    const blogsAfterAdd = await getAllBlogs();
    const found = blogsAfterAdd.find((b) => {
      return b.title === newBlog.title;
    });
    expect(found.title).toEqual(newBlog.title);
    expect(blogsBeforeAdd.length).toEqual(blogsAfterAdd.length-1);
  });

  test('blog without title can not be added', async () => {
    const newBlog = {
      author: 'Hannes Rinta-Räyhä',
      url: '127.0.0.1/',
      likes: 0
    };
    const blogsBeforeAdd = await getAllBlogs();
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400);
    const blogsAfterAdd = await getAllBlogs();
    expect(blogsAfterAdd.length).toEqual(blogsBeforeAdd.length);
    const found = blogsAfterAdd.find((b) => {
      return b.title === newBlog.title;
    });
    expect(found).toEqual(undefined);
  });

  test('blog without likes defaults to 0', async () => {
    const newBlog = {
      title: 'Jalkapallon tekoanalyysit',
      author: 'Hannes Rinta-Räyhä',
      url: '127.0.0.1/',
    };
    const result = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);
    expect(result.body.likes).toEqual(0);
  });

  test('blog without title and URL can not be added', async () => {
    const newBlog = {
      author: 'Hannes Rinta-Räyhä',
      likes: 0
    };
    const blogsBeforeAdd = await getAllBlogs();
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400);
    const blogsAfterAdd = await getAllBlogs();
    expect(blogsAfterAdd.length).toEqual(blogsBeforeAdd.length);
  });
});

describe('DELETE /api/blogs/:id', () => {
  let addBlog;
  beforeEach(async () => {
    addBlog = new Blog({
      'title': 'Teko-oppiminen, miten pääsen siitä eroon.',
      'author': 'Teemu Lesonen',
      'url': 'http://127.0.0.1/',
      'likes': 0
    });
    await Blog.remove({});
    await addBlog.save();
  });

  test('Can delete a blog', async() => {
    await api.delete('/api/blogs/' + addBlog._id).expect(204);
  });

  test('Deleting non-existing blog returns 404.', async () => {
    await Blog.remove({});
    await api.delete('/api/blogs/' + addBlog._id).expect(404);
  });

  test('Deleting blog with faulty id returns 400.', async () => {
    const dummyId = 0x123456;
    await api.delete('/api/blogs/' + dummyId).expect(400);
  });
});

describe('PUT /api/blogs/:id', () => {
  let modBlog = {
    'title': 'Teko-oppiminen, miten hyödynnän sitä.',
    'author': 'Hannu H. Moilanen',
    'url': 'http://127.0.0.1/tekoopros',
    'likes': 7
  };
  let addBlog;
  beforeEach(async () => {
    addBlog = new Blog({
      'title': 'Teko-oppiminen, miten pääsen siitä eroon.',
      'author': 'Teemu Lesonen',
      'url': 'http://127.0.0.1/',
      'likes': 0
    });
    await Blog.remove({});
    await addBlog.save();
  });

  test('Can modify a blog', async() => {
    const resultFromServer = await api.put('/api/blogs/' + addBlog._id).send(modBlog).expect(200);
    expect(resultFromServer.body.title).toEqual(modBlog.title);
    expect(resultFromServer.body.author).toEqual(modBlog.author);
    expect(resultFromServer.body.url).toEqual(modBlog.url);
    expect(resultFromServer.body.likes).toEqual(modBlog.likes);
  });

  test('Modify with incomplete data returns 400.', async() => {
    const blog = Object.assign({}, modBlog);
    delete blog['title'];
    await api.put('/api/blogs/' + addBlog._id).send(blog).expect(400);
    blog['title'] = 'Teko-oppiminen, miten pääsen siitä eroon.';
    delete blog['author'];
    await api.put('/api/blogs/' + addBlog._id).send(blog).expect(400);
    blog['author'] = 'Teemu Lesonen';
    delete blog['url'];
    await api.put('/api/blogs/' + addBlog._id).send(blog).expect(400);
    blog['url'] = 'http://127.0.0.1';
    delete blog['likes'];
    await api.put('/api/blogs/' + addBlog._id).send(blog).expect(400);
  });

  test('Modify with non-existing id returns 404', async() => {
    await Blog.remove({});
    const blog = Object.assign({}, modBlog);
    await api.put('/api/blogs/' + addBlog._id).send(blog).expect(404);
  });

  test('Modify with invalid id returns 400', async() => {
    const blog = Object.assign({}, modBlog);
    const id = 0x123456;
    await api.put('/api/blogs/' + id).send(blog).expect(400);
  });
});
afterAll(() => {
  server.close();
});
