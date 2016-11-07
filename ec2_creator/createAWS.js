AWS = require('aws-sdk');
var fs = require("fs");


AWS.config.update({
	accessKeyId: 'AKIAJF2DN75XZVU4HMCA',
	secretAccessKey: '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',
    region: 'us-east-1'
});

var ec2 = new AWS.EC2();

var params = {
	ImageId: 'ami-2d39803a',
	MinCount: 1, 
	MaxCount: 1,
	KeyName: 'devophw',
	InstanceType: 't2.micro'
};

var id;
var ip;

function printIp(isntance_id){
	ec2.waitFor('instanceRunning', {InstanceIds: [isntance_id]}, function(err, data) {
	  if (err) return console.error(err)
	  global.ip = data.Reservations[0].Instances[0].PublicIpAddress;
	  console.log("The IP address for aws is : " + global.ip);

	  // writing the inventory
	  var content = "aws_server ansible_ssh_host=" + global.ip + "  ansible_ssh_user=ubuntu ansible_ssh_private_key_file=../keys/key4aws.pem\n";
	  fs.appendFile("inventory", content, function(err){
	  	console.log("wrote inventory!");
	  });
	});
}

function createInstance(){
	ec2.runInstances(params, function(err, data){
		if(err) {
			console.error(err.toString());
		}else{
			for(var i in data.Instances){
				var instance = data.Instances[i];
				console.log(instance.InstanceId + ' created!');
				printIp(instance.InstanceId);
			}
		}
	});
}

createInstance();



