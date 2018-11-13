const express = require('express');

const createServer = () => {
  const app = express();
  const http = require('http').Server(app);
  const io = require('socket.io')(http);

  return {app, http, io};
};

module.exports = createServer;