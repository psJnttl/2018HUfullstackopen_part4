if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

let port = process.env.PORT;
let mongoUrl = process.env.FS18_PART4_MLAB_DB;

if (process.env.NODE_ENV === 'test') {
  port = process.env.TEST_PORT;
  mongoUrl = process.env.FS18_PART4_MLAB_TEST_DB;
}

module.exports = {
  mongoUrl,
  port
};
