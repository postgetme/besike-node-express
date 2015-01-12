module.exports = myexpress;

function myexpress() {
  var app = function(req, res, next2) {
    var stackPos = -1;

    function next(err) {
      stackPos += 1;

      if (app.stack.length <= stackPos) {
        if (next2) {
          next2(err);
        } else {
          res.statusCode = err ? 500 : 404;
          res.end();          
        }
      } else {
        if (err && app.stack[stackPos].length == 4) {
          app.stack[stackPos](err, req, res, next);
        } else if (!err && app.stack[stackPos].length == 3) {
          try {
            app.stack[stackPos](req, res, next);
          } catch (e) {
            next(e);
          }
        } else {
          next(err);
        }
      }
    }

    next();
  };
  
  app.listen = function(port, done) {
    var http = require("http");
    var server = http.createServer(this);
    server.listen(port, done);
    return server;
  };

  app.stack = [];

  app.use = function(middleware) {
    app.stack.push(middleware);
    return app;
  };

  return app;
}
