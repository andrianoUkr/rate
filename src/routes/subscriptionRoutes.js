const apiResponse = require('express-api-response');
const SubscriptionController = require('../controllers/SubscriptionController');
const subscriptionValidation = require('../validations/subscriptionValidation');

module.exports = function (router) {
  router
    .post('/subscribe',subscriptionValidation, SubscriptionController.subscribe, apiResponse)
    .post('/sendEmails', SubscriptionController.sendEmails, apiResponse)
};
