const exportPayloadSchema = require('./schema');
const InvariantError = require('../../exception/invariantError');

const ExportsValidator = {
  validateExportsPayload: (payload) => {
    const validationResult = exportPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};
module.exports = ExportsValidator;
