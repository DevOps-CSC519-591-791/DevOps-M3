var redis = require('redis');
var nodemailer = require('nodemailer');
var exec = require('child_process').exec;

var client = redis.createClient(6379, '54.234.163.154', {})

// Auto scaling when cpu or memory overload
function scaling(){
	console.log()
	client.SMEMBERS("proxy", function(err, items){
		if(err) return console.error(err);
		// console.log("List current proxy ips:" + items)
		items.forEach(function(ip){
			// console.log('Curr IP: ' + ip + "\n");

			
			client.lrange(ip, 0, -1, function(err, arrays){
				// console.log(typeof(arrays))
				// console.log(ip + ' ==> ' + arrays)

				var timestamp = [], memory = [], cpu = []
				arrays.forEach(function(s){
					arr = s.split(";")
					timestamp.push(parseFloat(arr[0]))
					memory.push(parseFloat(arr[1]))
					cpu.push(parseFloat(arr[2]))
				})

				var sum_memory = memory.reduce(function(previousValue, currentValue){ return Number(previousValue) + Number(currentValue); }, 0);
				var avg_memory = sum_memory / memory.length;

				var sum_cpu = cpu.reduce(function(previousValue, currentValue){ return Number(previousValue) + Number(currentValue); }, 0);
				var avg_cpu = sum_cpu / cpu.length;

				console.log(ip + '\tTimestamp: ' + timestamp[0] + '\tAve Mem: ' + avg_memory + '\tAvg CPU: ' + avg_cpu);
				if(avg_cpu > 0.7 || avg_memory > 0.7){
					console.log(ip + '\tTimestamp: ' + timestamp[0] + '\tAve Mem: ' + avg_memory + '\tAvg CPU: ' + avg_cpu)
					
					exec("cd /home/ubuntu/DevOps-M3/ec2_manager && bash ec2_creator.sh", function(error, stdout, stderr) {
					  mailing(ip, timestamp[0], avg_memory, avg_cpu);
					  console.log(stdout)
					});
				}

			});

			
		})
	})
}

// Sending email
function mailing(ip, timestamp, avg_memory, avg_cpu){
	var smtpConfig = {
	    host: 'smtp.gmail.com',
	    port: 465,
	    secure: true, // use SSL
	    auth: {
	        user: 'chenjb90@gmail.com',
	        pass: [YOUR PASSWORD HERE]
	    }
	};

	// create reusable transporter object using the default SMTP transport
	var transporter = nodemailer.createTransport(smtpConfig);

	// verify connection configuration
	transporter.verify(function(error, success) {
	   if (error) {
	        console.log(error);
	   } else {
	        console.log('Server is ready to take our messages');
	   }
	});

	// setup e-mail data with unicode symbols
	var mailOptions = {
	    from: '"Jenkins Admin" <jenkins_devops_m3@ncsu.edu>', // sender address
	    to: 'jchen37@ncsu.edu, zhu6@ncsu.edu, jchen45@ncsu.edu', // list of receivers
	    subject: 'DANGER: memory or cpu overload', // Subject line
	    // text: ip + '\tTimestamp: ' + timestamp + '\tAve Mem: ' + avg_memory + '\tAvg CPU: ' + avg_cpu, // plaintext body
	    html: '<b>' + ip + '\tTimestamp: ' + timestamp + '\tAve Mem: ' + avg_memory + '\tAvg CPU: ' + avg_cpu + '</b>' // html body
	};

	// send mail with defined transport object
	transporter.sendMail(mailOptions, function(error, info){
	    if(error){
	        return console.log(error);
	    }
	    console.log('Message sent: ' + info.response);
	});
}

setInterval(scaling, 60 * 1000);
