const InvariantError = require('../../exception/invariantError');
const { collaborationPayloadSchema } = require('./schema');

const CollaborationValidator = {
  validateCollaborationPayload: (payload) => {
    const validationResult = collaborationPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.message);
    }
  },
};
module.exports = CollaborationValidator;
