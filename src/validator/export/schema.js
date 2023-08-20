const Joi = require('joi');

const exportPayloadSchema = Joi.object({
  targetEmail: Joi.string().email({ tlds: true }).required(),
});
module.exports = exportPayloadSchema;
