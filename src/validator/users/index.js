const { userPayloadSchema } = require('./schema');
const InvariantError = require('../../exception/invariantError');

const userValidator = {
  validateUserPayload: (payload) => {
    const validationResult = userPayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};
module.exports = userValidator;
