const express = require('express');

const hostname = process.env.HOST_NAME || 'http://localhost';
const port = process.env.PORT || 4200;

const createRouter = io => {
  const router = express.Router();
  router.use(express.json());
  router.use(
    express.urlencoded({
      extended: true
    })
  );
  return router;
};

const createAuthRouter = io => {
  const router = createRouter();
  const RequestStore = require('./RequestStore');
  const store = new RequestStore();

  const getCallbackURL = request => {
    return `${hostname}:${port}/callback?token=${request}`;
  };

  router.post('/callback', function(req, res) {
    const credentials = req.body;

    const token = req.query.token;
    const socketId = store.getSocketID(token);
    if (!socketID) {
      res.send(JSON.stringify(store.getRequests()));
      return;
    }

    io.sockets.sockets[socketId].emit('credentials', credentials);
  });

  io.on('connection', socket => {
    const token = store.addSocketID(socket.id);

    // TODO: remove it
    socket.emit('token', getCallbackURL(token));

    socket.on('disconnect', function() {
      store.removeRequest(token);
    });

    socket.on('requestToken', function() {
      const token = store.getToken(socket.id);
      socket.emit('token', getCallbackURL(token));
    });
  });

  return router;
};

module.exports = createAuthRouter;
