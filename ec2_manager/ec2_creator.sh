#!/bin/sh

node createAWS.js
ansible-playbook -i inventory deploy/deploy.yml