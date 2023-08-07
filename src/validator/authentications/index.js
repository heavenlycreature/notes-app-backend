const {
  postAuthenticationPayloadSchema,
  putAuthenticationPayloadSchema,
  deleteAuthenticationPayloadSchema,
} = require('./schema');
const InvariantError = require('../../exception/invariantError');

const AuthenticationsValidator = {
  validatePostAuthenticationsPayload: (payload) => {
    const validationResult = postAuthenticationPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
  validatePutAuthenticationsPayload: (payload) => {
    const validationResult = putAuthenticationPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
  validatedeleteAuthenticationsPayload: (payload) => {
    const validationResult = deleteAuthenticationPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};
module.exports = AuthenticationsValidator;
