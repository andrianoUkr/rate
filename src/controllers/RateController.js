const RateService = require('../services/RateService');

class RateController {
  constructor() {}

  async getRateBtcToUahLast(req, res, next) {
    try {
      const result = await RateService.getRateBtcToUahLast();
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
        error: 'Mistake (Rate:System Exception:Get)',
      };
    }

    next();
  }
}

module.exports = new RateController();
