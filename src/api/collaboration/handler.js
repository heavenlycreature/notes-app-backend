const ClientError = require('../../exception/clientError');

class CollaborationHandler {
  constructor(CollaborationService, notesService, validator) {
    this._collaborationService = CollaborationService;
    this._notesService = notesService;
    this._validator = validator;

    this.postCollaborationHandler = this.postCollaborationHandler.bind(this);
    this.deleteCollaborationHandler = this.deleteCollaborationHandler.bind(this);
  }

  async postCollaborationHandler(request, h) {
    try {
      // validate owner who having jwt
      this._validator.validateCollaborationPayload(request.payload);
      const { id: credentialId } = request.auth.credentials;
      const { noteId, userId } = request.payload;
      // validate owner and collaborator (memberikan sesuai hak aksesnya)
      await this._notesService.verifyNoteOwner(noteId, credentialId);
      // assign the value
      const collaborationId = await this._collaborationService.addCollaboration(noteId, userId);

      const response = h.response({
        status: 'success',
        message: 'Kolaborasi berhasil ditambahkan',
        data: {
          collaborationId,
        },
      });
      response.code(201);
      return response;
    } catch (err) {
      if (err instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: err.message,
        });
        response.code(err.statusCode);
        return response;
      }
      // Server ERROR!
      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami.',
      });
      response.code(500);
      console.error(err);
      return response;
    }
  }

  async deleteCollaborationHandler(request, h) {
    try {
      // validate owner who having jwt
      this._validator.validateCollaborationPayload(request.payload);
      const { id: credentialId } = request.auth.credentials;
      const { noteId, userId } = request.payload;
      // validate owner and collaborator (memberikan sesuai hak aksesnya)
      await this._notesService.verifyNoteOwner(noteId, credentialId);
      // assign the value
      await this._collaborationService.deleteCollaboration(noteId, userId);

      return {
        status: 'success',
        message: 'Kolaborasi berhasil dihapus',
      };
    } catch (err) {
      if (err instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: err.message,
        });
        response.code(err.statusCode);
        return response;
      }
      // Server ERROR!
      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami.',
      });
      response.code(500);
      console.error(err);
      return response;
    }
  }
}
module.exports = CollaborationHandler;
