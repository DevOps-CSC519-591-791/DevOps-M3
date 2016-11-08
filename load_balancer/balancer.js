var redis 	= require('redis');
var express = require('express');
var app 	= express();
var http 	= require('http');
var httpProxy = require('http-proxy');

// REDIS
var client = redis.createClient(6379, '54.234.163.154', {});

// HTTP Proxy
var proxy = httpProxy.createProxyServer({});
var proxyServer = http.createServer(function(req, res){
	client.spop("proxy", function(err, serverDetail){
		console.log("Current proxy server is " + serverDetail);
		proxy.web(req, res, {target: serverDetail});
		client.sadd("proxy", serverDetail);
	});
});
proxyServer.listen(3000);
console.log("The proxy server delivers requests to http://%s:%s", proxyServer.address().address, proxyServer.address().port);