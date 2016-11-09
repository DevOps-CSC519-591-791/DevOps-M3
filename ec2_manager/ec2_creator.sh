#!/bin/sh

sudo node createAWS.js
echo 'start sleeping'
sudo chmod 500 ../keys/key4aws.pem
sleep 30s
echo 'end sleeping'
sudo ansible-playbook -i inventory deploy/deploy.yml