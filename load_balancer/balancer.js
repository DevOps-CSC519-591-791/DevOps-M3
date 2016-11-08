var redis 	= require('redis');
var express = require('express');
var app 	= express();
var http 	= require('http');
var httpProxy = require('http-proxy');
var alert = '0';
var port;

// REDIS
var client = redis.createClient(6379, '54.234.163.154', {});

// HTTP Proxy
var proxy = httpProxy.createProxyServer({});
var proxyServer = http.createServer(function(req, res){
	client.spop("proxy", function(err, serverIp){
		console.log("Current proxy server is " + serverIp);
		// get alert value
		client.get("alert", function(err, value){
			alert = value;
			// console.log("Alert value is " + alert);
		});

		if(Math.random() > 0.7 && alert == '0'){
			port = '3001';
		} else {
			port = '3000';
		}
		proxy.web(req, res, {target: serverIp + ':' + port});
		client.sadd("proxy", serverIp);
	});
});
proxyServer.listen(3000);
console.log("The proxy server delivers requests to http://%s:%s", proxyServer.address().address, proxyServer.address().port);