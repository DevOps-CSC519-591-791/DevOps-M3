#!/bin/sh

sudo node updateRedisIps.js
echo 'smembers proxy'|redis-cli -h 54.234.163.154 > ips
sudo rm slavers

sudo cat ips | while read LINE
do
	sudo echo "aws_server ansible_ssh_host=$LINE ansible_ssh_user=ubuntu ansible_ssh_private_key_file=../keys/key4aws.pem" >> "slavers"
done

sudo rm ips

sudo ANSIBLE_HOST_KEY_CHECKING=False ansible-playbook -i slavers deploy/deploy.yml
