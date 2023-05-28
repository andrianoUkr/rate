const apiResponse = require('express-api-response');
const RateController = require('../controllers/RateController');

module.exports = function (router) {
  router
    .get('/rate', RateController.getRateBtcToUahLast, apiResponse)
};
