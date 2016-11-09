#!/bin/sh

sudo node createAWS.js
echo 'start sleeping'
sleep 30s
echo 'end sleeping'
sudo ansible-playbook -i inventory deploy/deploy.yml -vvvv