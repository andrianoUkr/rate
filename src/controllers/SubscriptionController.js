const SubscriptionService = require('../services/SubscriptionService');

class SubscriptionController {
  constructor() {}

  async subscribe(req, res, next) {
    try {
      const { email } = req.body;

      const result = await SubscriptionService.subscribe(email);
      const { msg, data } = result;
      if (data) {
        res.data = { success: 1, data };
      } else {
        res.data = {
          success: 0,
          error: msg,
        };
      }
    } catch (error) {
      console.log(error);
      res.data = {
        success: 0,
        error: 'Mistake (Subscription:Subscribe:System Exception:Post)',
      };
    }

    next();
  }
  async sendEmails(req, res, next) {
    try {
      const result = await SubscriptionService.sendEmails();
      const { msg, data } = result;
      let responseData = {};

      if (data) {
        responseData = { success: 1, data };
      } else {
        responseData = {
          success: 0,
          error: msg,
        };
      }

      res.status(200).send(responseData);
      return;
    } catch (error) {
      console.log(error);
      res.data = {
        success: 0,
        error: 'Mistake (Subscription:SendEmails:System Exception:Post)',
      };
    }

    next();
  }
}

module.exports = new SubscriptionController();
