'use strict';

var assert = require("assert"),
    http = require("http"),
    exec = require('child_process').exec;

describe('server', function () {
  it('should return 200', function (done) {
    http.get('http://localhost:3000', function (res) {
      assert.equal(200, res.statusCode);
      done();
    });
  });
});
