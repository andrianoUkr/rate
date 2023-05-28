const { get } = require('lodash');
const nodemailer = require('nodemailer');

const SubscriptionModel = require('../models/SubscriptionModel');
const transporterEmail = require('../helpers/transporterEmail');

class SubscriptionService {
  constructor() {}

  async insertEmail(email) {
    return new Promise((resolve) => {
      SubscriptionModel.insert({ email }, (err, data) => resolve({ err, data }));
    });
  }
  async getAllEmails() {
    return new Promise((resolve) => {
      const listEmails = SubscriptionModel.getAllData().map(({ email }) => email);
      resolve(listEmails);
    });
  }

  async subscribe(email) {
    try {
      const response = await this.insertEmail(email);
      const { err, data } = response;
      if (!err && Object.keys(data).length) {
        return { msg: null, data };
      } else {
        return { msg: err, data: null };
      }
    } catch (error) {
      console.log(error);
      return {
        msg: get(error, 'response.data.data.message'),
        data: null,
      };
    }
  }
  async sendEmails() {
    try {
      const listEmails = await this.getAllEmails();
      listEmails.forEach((element) => {
        transporterEmail(element);
      });

      return { msg: null, data: listEmails };
    } catch (error) {
      console.log(error);
      return {
        msg: get(error, 'response.data.data.message'),
        data: null,
      };
    }
  }
}

module.exports = new SubscriptionService();
