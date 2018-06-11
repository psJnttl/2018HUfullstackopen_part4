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
  ].join(' ')
});

const error = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

module.exports = {mLogger, morgan, error};
