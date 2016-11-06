var http = require('http'); // these lines are somewhat similar to #include in C++
var util = require('util'); // except that the left hand side is an object/variable
var url = require('url');
var fs = require('fs');
var redis = require('redis');

var client = redis.createClient(6379, '127.0.0.1', {})

var server = http.createServer(function (req,res){
	 // parse the URL
	var url_parts = url.parse(req.url,true);

	// functions to serve static files
	function sendHTML(filepath) {
		// read the file asyncronously
		fs.readFile(filepath,function(error,contents){ 
			// once the file is loaded, this function runs
	    	console.log('Serving the html ' + filepath);
	    	res.end(contents); // end the request and send the file
	    });
	}
	function sendCSS(filepath) {
		// once the file is loaded, this function runs
		fs.readFile(filepath,function(error,contents){ 
	    	console.log('Serving the css ' + filepath);
	    	res.end(contents); // end the request and send the file
	    });
	}

	// serve the index page from a static file
	if( url_parts.pathname == '/' ) {
		sendHTML('./form.html');
	}
	// generate a dynamic page
	else if ( url_parts.pathname == '/submit' ) {
		var x = 0
		if (url_parts.query.flag.indexOf('f1')>=0){
			x = x+10000
		}
		if (url_parts.query.flag.indexOf('f2')>=0){
			x = x+1000
		}
		if (url_parts.query.flag.indexOf('f3')>=0){
			x = x+100
		}
		if (url_parts.query.flag.indexOf('f4')>=0){
			x = x+10
		}
		if (url_parts.query.flag.indexOf('f5')>=0){
			x = x+1
		}
		
		res.write('finish!')
		setTimeout(function(){
			x = '00000' + x;
			x = x.substring(x.length-5);
			client.set('flag', x);
		},1);
		
		res.end();
	}
	else {
		res.writeHead(404) // put a header for not found
		// print the page and end the request
		res.end("<h1>404 - Path not recognized</h1>"); 
	}
 });

const PORT = 8085; 

server.listen(PORT);
util.log('Server listenning at localhost:'+PORT);