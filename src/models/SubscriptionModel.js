const NeDB = require('nedb');
const path = require('path');

const dbPath = './data';
const SubscriptionModel = new NeDB({
  filename: path.join(dbPath, 'subscription.db'),
  autoload: true,
});

module.exports = SubscriptionModel;
