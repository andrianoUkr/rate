const { API_TRADE_URL } = require('../constants/pathRequest');
const { get } = require('lodash');
const ClientApi = require('../helpers/ClientApi');

class RateService {
  constructor() {}

  async getRateBtcToUahLast() {
    try {
      const response = await ClientApi({
        url: `${API_TRADE_URL}api/ticker/btc_uah`,
        method: 'get',
      });
      const { data } = response;
      if (Object.keys(data).length) {
        return { msg: null, data };
      } else {
        return { msg: 'Mistake (Rate:Get)', data: null };
      }
    } catch (error) {
      console.log(error);
      return {
        msg: get(error, 'response.data.data.message'),
        data: null,
      };
    }
  }
}

module.exports = new RateService();
