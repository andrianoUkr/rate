const rateRoutes = require('./rateRoutes');
const subscriptionRoutes = require('./subscriptionRoutes');

module.exports = (routes) => ({
  rate: rateRoutes(routes),
  subscription: subscriptionRoutes(routes),
});
