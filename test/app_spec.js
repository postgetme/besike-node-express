var request = require("supertest")
  , expect = require("chai").expect
  , http = require("http");

var express = require("../");

describe("Implement Empty App",function() {
  var app = express();
  describe("as handler to http.createServer",function() {
    it("responds to /foo with 404", function(done) {
      var server = http.createServer(app);
      request(server).get("/foo").expect(404).end(done);
    });
  });

  describe("Defining the app.listen method",function() {
    var port = 7001;
    var server;

    before(function(done) {
      server = app.listen(port,done);
    });

    it("should return an http.Server",function() {
      expect(server).to.be.instanceof(http.Server);
    });

    it("responds to /foo with 404",function(done) {
      request("http://localhost:" + port).get("/foo").expect(404).end(done);
    })
  });
});
