const fetch = require('node-fetch');

const request = async (_host, _endpoint, _token = null, _body = null, _method = 'GET') => {
  const response = await fetch(_host+_endpoint, {
    method: _method,
    headers: {
      'Authorization': _token
    },
    body: _body
  })
  const json = await response.json();
  return json;
};

module.exports = request
