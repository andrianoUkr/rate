const axios = require('axios');

module.exports = (function () {
  return axios.create({
    headers: {
      get: {
        'Content-Type': 'application/json',
      },
      post: {
        'Content-Type': 'application/json',
      },
      put: {
        'Content-Type': 'application/json',
      },
    },
  });
})();
