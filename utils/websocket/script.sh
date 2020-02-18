#!/bin/bash

# https://github.com/joewalnes/websocketd
# 使用websocketd模拟ws服务器
# 启动 websocketd --port=8888 bash ./script.sh

while read LINE
do
	if [ $LINE = "ping" ]
	then
		sleep $((RANDOM % 20 + 1)) & wait
		echo "pong $((RANDOM % 10 + 1))"
	else
		echo "serve data: $LINE"
	fi
done
