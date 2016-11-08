# DevOps-M3
This is the repository for [DevOps Milestone 3](https://github.com/CSC-DevOps/Course/blob/master/Project/M3.md). We use [M3-simpleApp](https://github.ncsu.edu/DevOps-Milestones/M3-simpleApp) as our test node.js project.
 -  Test node.js project: [link](https://github.ncsu.edu/DevOps-Milestones/M3-simpleApp)
 -  Screencast:

### Prerequisite
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
    └── package.json
```
 - Folder `ec2_creator` is used to build a new AWS EC2 instance and config the production environment automatically.
  - File `createAWS.js` is the main script to build the AWS EC2 instance.
  - Folder `deploy` stores the configure files used for ansible.
  - File `inventory` will be updated each time when a new AWS EC2 instance is built.
  - File `package.json` is the configure file for node.js.
  - File `ec2_creator.sh` is the shell file. Basically, you can run `bash ec2_creator.sh`. And then a new AWS EC2 instance with production environment and our test node.js app will be built.
  


Milestone 3 server structure. [img]


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
