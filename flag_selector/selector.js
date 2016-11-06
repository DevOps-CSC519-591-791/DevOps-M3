var http = require('http')
var redis = require('redis')
var express = require('express')
var fs      = require('fs')
const exec = require('child_process').exec;

// REDIS
var client = redis.createClient(6379, '127.0.0.1', {})

const PORT = 8085; 
function handleRequest(request, response){
    response.end('It Works!! Path Hit: ' + request.url);
}

//Create a server
var server = http.createServer(handleRequest);

//Lets start our server
server.listen(PORT, function(){
    //Callback triggered when server is successfully listening. Hurray!
    console.log("Server listening on: http://localhost:%s", PORT);
});