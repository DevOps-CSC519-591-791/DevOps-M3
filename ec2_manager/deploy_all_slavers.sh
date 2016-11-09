#!/bin/sh

node updateRedisIps.js
echo 'smembers proxy'|redis-cli -h 54.234.163.154 > ips
rm slavers

cat ips | while read LINE
do
	echo "$LINE ansible_ssh_host=$LINE ansible_ssh_user=ubuntu ansible_ssh_private_key_file=../keys/key4aws.pem" >> "slavers"
done

rm ips

ansible-playbook -i slavers deploy/deploy.yml