AWS = require('aws-sdk');
var redis = require('redis');
var fs = require("fs");

// REDIS
var client = redis.createClient(6379, '54.234.163.154', {})

AWS.config.update({
	accessKeyId: 'AKIAJF2DN75XZVU4HMCA',
	secretAccessKey: '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',
    region: 'us-east-1'
});


var ec2 = new AWS.EC2();

function printStatuses() {
    ec2.describeInstances({}, function(err, data) {
        if(err) {
            console.error(err.toString());
        } else {
            client.del('proxy', function(err, value){});
            for(var r=0,rlen=data.Reservations.length; r<rlen; r++) {
                var reservation = data.Reservations[r];
                for(var i=0,ilen=reservation.Instances.length; i<ilen; ++i) {
                    var instance = reservation.Instances[i];
                    var name = '';
                    for(var t=0,tlen=instance.Tags.length; t<tlen; ++t) {
                        if(instance.Tags[t].Key === 'Name') {
                            name = instance.Tags[t].Value;
                        }
                    }
                    if (name != 'jenkins' && instance.State.Name == 'running'){
                        client.sadd('proxy', instance.PublicIpAddress, function(err, value){});
                    	console.log(instance.PublicIpAddress);
                    }
                }
            }
        }
    });    
}

printStatuses()