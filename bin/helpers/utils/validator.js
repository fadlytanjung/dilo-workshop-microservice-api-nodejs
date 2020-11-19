const joi = require('joi');

const isValidPayload = (payload, constraint) => {
  const { value, error } = joi.validate(payload, constraint);
  if (!validate.isEmpty(error)) {
    return error
  }
  return value

};

module.exports = {
  isValidPayload
};
