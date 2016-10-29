var redis = require('redis')
var multer  = require('multer')
var express = require('express')
var fs      = require('fs')
var app = express()
const exec = require('child_process').exec;

// REDIS
var client = redis.createClient(6379, '127.0.0.1', {})
var myurl;
// Add hook to make it easier to get all visited URLS.
app.use(function(req, res, next) 
{
	console.log(req.method, req.url);
	client.lpush("mylist", req.url);
	next(); // Passing the request to the next handler in the stack.
});

app.get('/', function(req, res) {
  console.log(myurl)
  res.send('hello world from instance ' + myurl)
})

app.get('/get', function(req, res){
	client.get("k1", function(err,value){
		res.send(value);
	});
	// res.send("sent.");
});

app.get('/set/:key', function(req, res){
	client.set("k1", req.params.key)
	client.expire("k1", 10)
	res.send("k1 set. **Expire in 10 seconds**");
});

app.get('/recent', function(req, res){
	client.lrange('mylist', 0, -1, function(err, value){
		// console.log(value);
		res.send(value);
	});
});

app.post('/upload',[ multer({ dest: './uploads/'}), function(req, res){
    console.log(req.body) // form fields
    console.log(req.files) // form files

   if( req.files.image )
   {
	   fs.readFile( req.files.image.path, function (err, data) {
	  		if (err) throw err;
	  		var img = new Buffer(data).toString('base64');
	  		// console.log(img);
	  		client.lpush("figcontents", img);
		});
	}

   res.status(204).end()
}]);

app.get('/meow', function(req, res) {
	{
		var imagedata
		res.writeHead(200, {'content-type':'text/html'});
		var imgs = client.lrange('figcontents', 0,0, function(err,items){
			items.forEach(function(item){
				imagedata = item
				client.lpop('figcontents');
				res.write("<h1>\n<img src='data:my_pic.jpg;base64,"+imagedata+"'/>");
			})
			res.end();
		})
	}
});



app.get('/listservers', function(req, res){
	client.lrange('ap', 0, -1, function(err, value){
		console.log(value);
		res.send(value);
	});
});

// HTTP SERVER 
var args = process.argv.slice(2);
var server = app.listen(args[0], function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)
  myurl = 'http://localhost:'+port
})