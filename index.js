module.exports = myexpress;

function myexpress() {
  function app(req, res, next) {
    res.statusCode = 404;
    res.end();
  }
  
  app.listen = function (port, done) {
    var http = require("http");
    var server = http.createServer(this);
    server.listen(port, done);
    return server;
  }

  return app;
}
