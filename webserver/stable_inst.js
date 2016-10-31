var http = require('http');
var redis = require('redis')
var multer  = require('multer')
var express = require('express')
var fs      = require('fs')
var app = express()
const exec = require('child_process').exec;

// REDIS
var client = redis.createClient(6379, '127.0.0.1', {})
var myurl;

function print_hello(req, res){
	// TODO setting the local url and print that
	res.write('<html>');
    res.write('<body>');
    res.write('Hello! This is the web page for milestone 3 demo.</br></br>');
    res.write('<b>This instance shows the stable version.</b>');
    res.write('</body>');
    res.write('</html>');
}

var args = process.argv.slice(2);
const PORT=args[0]; 

function handleRequest(req, res){
	print_hello(req, res)
    res.end();
}

var server = http.createServer(handleRequest);

//Lets start our server
server.listen(PORT, function(){
    console.log("Server listening on: http://localhost:%s", PORT);
});

exports.server = server;