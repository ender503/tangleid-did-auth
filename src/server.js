
const { app, http, io } = require('./utils/createServer')();

const hostname = process.env.HOST_NAME || 'http://localhost';
const port = process.env.PORT || 4200;

const router = require('./router');
app.use('/', router(io));

app.get('/', function(req, res) {
  res.send('TangleID DID Auth');
});

http.listen(port, function() {
  console.log(`listening on ${hostname}:${port}`);
});
