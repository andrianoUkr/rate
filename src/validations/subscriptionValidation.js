const Joi = require('joi');
const SubscriptionModel = require('../models/SubscriptionModel');

function validationFields(payload) {
  const schema = Joi.object({
    email: Joi.string().email().required(),
  });

  const isValid = schema.validate(payload);
  if (isValid.error) {
    return { error: isValid.error.message };
  }
  return {};
}

async function checkEmail(email) {
  return new Promise((resolve) => {
    SubscriptionModel.findOne({ email }, function (err, data) {
      resolve({ err, data });
    });
  });
}

async function subscriptionValidation(req, res, next) {
  try {
    const { email } = req.body;
    const { error } = validationFields({ email });

    if (error) {
      res.status(422).send({ error });
      return;
    }

    const { err, data } = await checkEmail(email);
    if (err) {
      throw err;
    }
    if (data && Object.keys(data).length) {
      res.status(409).send({
        success: 0,
        error: 'This email was inserted earlier',
      });
      return;
    }

    next();
  } catch (e) {
    next(e);
  }
}

module.exports = subscriptionValidation;
