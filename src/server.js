require('dotenv').config();

const Hapi = require('@hapi/hapi');
const notes = require('./api/notes');
const NotesService = require('./services/postgre/notesService');
const NotesValidator = require('./validator/notes');

// user
const users = require('./api/user');
const UsersService = require('./services/postgre/userService');
const UsersValidator = require('./validator/users');

const init = async () => {
  const notesService = new NotesService();
  const usersService = new UsersService();
  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.register([
    {
      plugin: notes,
      options: {
        service: notesService,
        validator: NotesValidator,
      },
    },
    {
      plugin: users,
      options: {
        service: usersService,
        validator: UsersValidator,
      },

    }
  ]);

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
