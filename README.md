# DevOps-M3
Repository for [DevOps Milestone 3](https://github.com/CSC-DevOps/Course/blob/master/Project/M3.md)  

### Setting up redis and loadbalancer
Our Loadbalancer and redis server is deployed in a AWS EC2 server  
To deploy redis
```
cd main_server_deployer
ansible-playbook -i inventory deploy_mainserver.yml
```

### Want to set up the flag?
```
cd flag_selector
npm install
forever start selector.js
```
Then go to localhost:8085  
![flag](README_img/flag.png)
