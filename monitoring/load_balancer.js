var redis = require('redis');

var client = redis.createClient(6379, '54.234.163.154', {})

client.lrange("proxy", 0, -1, function(err, items){
	if(err) return console.error(err)
	console.log("List current proxy ips:")
	items.forEach(function(ip){
		console.log(ip + "\n");
	});
});