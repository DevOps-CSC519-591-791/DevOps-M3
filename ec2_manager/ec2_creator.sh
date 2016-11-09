#!/bin/sh

sudo node createAWS.js
sudo ansible-playbook -i inventory deploy/deploy.yml