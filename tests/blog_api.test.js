const supertest = require('supertest');
const { app, server } = require('../index');
const api = supertest(app);
const Blog = require('../models/blog');

const initialBlogs = [
  {
    'title': 'Tekoäly on jaksaa pidempään kuin sinä.',
    'author': 'Teemu Lesonen',
    'url': 'http://127.0.0.1/',
    'likes': 0
  },
  {
    'title': 'Tunnista tekotunteet.',
    'author': 'Saija Nairanen',
    'url': 'http://127.0.0.1/',
    'likes': 0
  },
  {
    'title': 'Miten pääsen eroon teko-oppimisesta.',
    'author': 'Henri Hera-Keirinen',
    'url': 'http://127.0.0.1/',
    'likes': 0
  },
];


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

    expect(response.body.length).toBe(initialBlogs.length);
  });

  test('there is a blog about emotions', async () => {
    const response = await api
      .get('/api/blogs');
    const titles = response.body.map((b) => {
      return b.title;
    });
    expect(titles).toContain(initialBlogs[1].title);
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
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);
    const blogsAfter = await api.get('/api/blogs');
    const found = blogsAfter.body.find((b) => {
      return b.title === newBlog.title;
    });
    expect(found.title).toEqual(newBlog.title);
  });

  test('blog without title can not be added', async () => {
    const newBlog = {
      title: 'Jalkapallon tekoanalyysit',
      url: '127.0.0.1/',
      likes: 0
    };
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400);
    let blogsAfter = await api.get('/api/blogs');
    expect(blogsAfter.body.length).toEqual(initialBlogs.length);

    newBlog['author'] = 'Hannes Rinta-Räyhä';
    delete newBlog['url'];
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400);
    blogsAfter = await api.get('/api/blogs');
    expect(blogsAfter.body.length).toEqual(initialBlogs.length);
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
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400);
    blogsAfter = await api.get('/api/blogs');
    expect(blogsAfter.body.length).toEqual(initialBlogs.length);

  });

});

afterAll(() => {
  server.close();
});
