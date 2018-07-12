const morgan = require('morgan');

morgan.token('body', function (req, res) {
  let body = req.body ? req.body : {};
  return JSON.stringify(body);
});

const mLogger = morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.body(req, res),
    'Status:', tokens.status(req, res), '-',
    tokens['response-time'](req, res), 'ms'
  ].join(' ');
});

const error = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

const tokenExtractor = (request, response, next) => {
  request.token = null;
  if(request.headers && request.headers.authorization) {
    const auth = request.headers.authorization;
    if (auth.toLowerCase().startsWith('bearer')) {
      const token = request.headers.authorization.substr('bearer'.length+1);
      request.token = token;
    }
  }
  next();
};

module.exports = {mLogger, morgan, error, tokenExtractor};
