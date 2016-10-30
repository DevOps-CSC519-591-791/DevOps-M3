'use strict';

var assert = require("assert"),
    http = require("http"),
    exec = require('child_process').exec;

describe('server', function () {
  before(function (done) {
      exec('forever start stable_inst.js 3000', (error, stdout, stderr)=>{
        setTimeout(()=>{done()},2)
    });
  });

  it('should return 200', function (done) {
    http.get('http://localhost:3000', function (res) {
      assert.equal(200, res.statusCode);
      done();
    });
  });

  after(function (done) {
    exec('forever stopall', (error, stdout, stderr)=>{
        setTimeout(()=>{done()},2)
    });
  });

});
