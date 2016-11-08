# DevOps-M3
This is the repository for [DevOps Milestone 3](https://github.com/CSC-DevOps/Course/blob/master/Project/M3.md). We use [M3-simpleApp](https://github.ncsu.edu/DevOps-Milestones/M3-simpleApp) as our simple node.js project.
 -  Simple node.js project: [link](https://github.ncsu.edu/DevOps-Milestones/M3-simpleApp)
 -  Screencast:

### Prerequisite
Milestone 3 server structure. [img]

Milestone 3 file structure. 
```
.
├── ec2_creator
│   ├── createAWS.js
│   ├── deploy
│   │   ├── deploy.retry
│   │   ├── deploy.yml
│   │   └── roles
│   ├── ec2_creator.sh
│   ├── inventory
│   └── package.json
├── flag_selector
│   ├── form.html
│   ├── package.json
│   └── selector.js
├── load_balancer
│   ├── balancer.js
│   └── package.json
├── main_server_deployer
│   ├── deploy_mainserver.yml
│   └── inventory
└── monitoring
    ├── scaling.js
    └── package.json
```
 - Folder `ec2_creator` is used to build a new AWS EC2 instance and config the production environment automatically.
  - File `createAWS.js` is the main script to build the AWS EC2 instance.
  - Folder `deploy` stores a configuration files used for ansible. These configuration files will install node.js, npm, git clone the simple node.js app and start the express server using forever.
  - File `inventory` will be updated each time when a new AWS EC2 instance is built.
  - File `package.json` is a configure file for node.js.
  - File `ec2_creator.sh` is a shell file. Basically, you can run `bash ec2_creator.sh`. And then a new AWS EC2 instance with production environment and our simple node.js app will be built.
  
 - Folder `flag_selector` store the scripts and view pages of feature flag selection.
  - File `form.html` is a view page for feature flag selection and alert.
  - File `selector.js` is a script for obtaining the feature flag(s) and alert from view page and store the information to a global redis store. And scripts ([`stable_inst.js`](https://github.ncsu.edu/DevOps-Milestones/M3-simpleApp/blob/master/stable_inst.js) and [`canary.js`](https://github.ncsu.edu/DevOps-Milestones/M3-simpleApp/blob/master/canary.js)) in our simple node.js app will read certain key stored in redis and display certain turn-on features.
  - File `package.json` is a configure file for node.js.

 - Folder `load_balancer` is used to perform a canary release - route a percantage of traffix to a newly staged version of software and remaining traffix to stable version of software.
  - File `balancer.js` reads the ip address of AWS EC2 instances (slaves) stored in redis and used http-proxy to loab balance. By default, 70% of traffic will go to stable version of software and 30% of traffic will go to newly staged version of software.
  - File `package.json` is a configure file for node.js.
 
 - Folder `main_server_deployer` stores ansible configurations of main server.
  - File `deploy_mainserver.yml` will install redis to main server, git clone this repo and start the feature flag service (port 8080), load balancer service (port 3000) and monitoring service (port 8100).
  - File `inventory` records the ip address and private key used for ansible configuration.
 
 - Folder `monitoring` is used to perform autoscale if necessary.
  - File `scaling.js` is the script for analyse the monitoring metrics from deployed AWS EC2 instances and autoscale individual components of production if necesssary.
  - File `package.json` is a configure file for node.js.


### Setting up redis and loadbalancer
Our Loadbalancer and redis server is deployed in a AWS EC2 server  
To deploy redis
```
cd main_server_deployer
ansible-playbook -i inventory deploy_mainserver.yml
```

### Want to set up the feature flags?
```
cd flag_selector
npm install
forever start selector.js
```
Then go to localhost:8085.  
Note that the change to be effitive at the remote aws server
![flag](README_img/flag.png)
