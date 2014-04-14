#!/bin/bash

git push origin

curl http://10.4.3.41:13020/dep\?dir\=/home/ubuntu/ever-dungeon/ever-dungeon\&cmd\=chgdir
curl http://10.4.3.41:13020/dep\?cmd\=reset
curl http://10.4.3.41:13020/dep\?arg\=Game\&cmd\=restart
curl http://10.4.3.41:13020/dep\?cmd\=status
