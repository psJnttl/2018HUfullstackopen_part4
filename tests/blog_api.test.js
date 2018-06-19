const supertest = require('supertest');
const { app, server } = require('../index');
const api = supertest(app);
const Blog = require('../models/blog');

const initialBlogs = [
  {
    "title": "Tekoäly on jaksaa pidempään kuin sinä.",
    "author": "Teemu Lesonen",
    "url": "http://127.0.0.1/",
    "likes": 0
  },
  {
    "title": "Tunnista tekotunteet.",
    "author": "Saija Nairanen",
    "url": "http://127.0.0.1/",
    "likes": 0
  },
  {
    "title": "Miten pääsen eroon teko-oppimisesta.",
    "author": "Henri Hera-Keirinen",
    "url": "http://127.0.0.1/",
    "likes": 0
  },
];

beforeAll(async () => {
  await Blog.remove({});

  const blogObjects = initialBlogs.map(b => new Blog(b));
  const promiseArray = blogObjects.map(b => b.save());
  await Promise.all(promiseArray);
});

describe('GET /api/blogs', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('correct number of blogs listed', async () => {
    const response = await api
      .get('/api/blogs');

    expect(response.body.length).toBe(initialBlogs.length)
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

afterAll(() => {
  server.close();
});
