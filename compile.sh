#!/bin/bash

VersionFile="build/version.json"
ConfigFile="build/config.json"

CurrentBranch=`git branch | awk 'BEGIN{FS=" "}{if ($1=="*") print $2}'`

CurrentPWD=`pwd`

echo '===== Compiling ====='
cd server
gulp compile
cp js/*.js $CurrentPWD/build
cp package.json $CurrentPWD/build
cd ../data
git pull

cd ..

echo '===== Updating black box ====='
SOURCES=(
"define.js"
"serializer.js"
"spell.js"
"unit.js"
"container.js"
"item.js"
"seed-random.js"
"commandStream.js"
"dungeon.js"
"trigger.js"
)

DST_BOX="blackbox/"
for itm in ${SOURCES[*]}
do
  cp -f build/${itm} ${DST_BOX}${itm}
  sed -i "s/require(/requires(/g" ${DST_BOX}${itm}
  sed -i "s/var\ dbLib/\/\/var\ dbLib/g" ${DST_BOX}${itm}
  sed -i "s/dbWrapper'/serializer'/g" ${DST_BOX}${itm}
  sed -i "s/\.DBWrapper/\.Serializer/g" ${DST_BOX}${itm}
#  sed -ig 's/exports\.fileVersion = -1/exports\.fileVersion = '$CurrentVersion'/g' ${DST_BOX}${itm}
done

cp data/table/*.json build/
cp data/stable/*.json build/


while [ $CurrentBranch = "master" ]; do
  read -p "Do you wish to update the MASTER branch(YES/NO):" yn
  case $yn in
    [YES]* ) break;;
    [NO]* ) exit;;
    * ) echo 'Please answer YES or NO';;
  esac
done

echo "Pull remote code"
git pull

echo '===== Synchronize data and code... ====='
./copyData.command

echo '===== Setting up variables ====='
if [ $CurrentBranch = develop ]
then
  CDNVersionBucket='hotupdate'
  RemoteRepo='deploy'
  UpdateUrl='http://hotupdate.qiniudn.com'
  ServerConfiguration='Develop'
  ServerID=0
elif [ $CurrentBranch = master ]
then
  CDNVersionBucket='drhu'
  RemoteRepo='v1'
  UpdateUrl='http://drhu.qiniudn.com'
  ServerConfiguration='Master'
  ServerID=1
elif [[ $CurrentBranch = localWork  ||  $CurrentBranch = 91 ]]
then
  CDNVersionBucket='hotupdate'
  RemoteRepo='deploy'
  UpdateUrl='http://hotupdate.qiniudn.com'
  ServerConfiguration='Develop'
  ServerID=0
else
  echo 'Invalid target branch'
  exit
fi

CurrentVersion=`curl -s $UpdateUrl/version`
echo 'Current version: '$CurrentVersion

sed -ig 's#"url":.*,#"url": "'$UpdateUrl'",#g' $VersionFile
sed -ig 's/"resource_version": .*,/"resource_version": '$CurrentVersion',/g' $VersionFile
sed -ig 's/"ServerName": .*,/"ServerName": "'$ServerConfiguration'",/g' $ConfigFile
sed -ig 's/"ServerID": .*,/"ServerID": "'$ServerID'",/g' $ConfigFile

echo '===== Sync black box... ====='
SOURCES=(
"define.js"
"serializer.js"
"spell.js"
"unit.js"
"container.js"
"item.js"
"seed-random.js"
"commandStream.js"
"dungeon.js"
"trigger.js"
)

DST_BOX="./Clients/PocketDungeon/PocketDungeon/Resources/blackbox/"
SRC_BOX="./Server/"
for itm in ${SOURCES[*]}
do
  rm -f ${DST_BOX}${itm}
  cp -f ${SRC_BOX}${itm} ${DST_BOX}${itm}
  sed -ig "s/require(/requires(/g" ${DST_BOX}${itm}
  sed -ig "s/var\ dbLib/\/\/var\ dbLib/g" ${DST_BOX}${itm}
  sed -ig "s/dbWrapper'/serializer'/g" ${DST_BOX}${itm}
  sed -ig "s/\.DBWrapper/\.Serializer/g" ${DST_BOX}${itm}
#  sed -ig 's/exports\.fileVersion = -1/exports\.fileVersion = '$CurrentVersion'/g' ${DST_BOX}${itm}
done

# Commit
echo '===== Commit the changes ====='
git commit -am 'Commit changes branch:'$CurrentBranch' @ '$CurrentVersion
git push origin  

echo 'Deploying '
DeployServer=122.226.199.14
echo 'Deploy server '$RemoteRepo
cp ./Data/table/*.json ./Server/
cp ./Data/table/*.js ./Server/
cp ./Data/stable/*.json ./Server/
cp ./Server/*.js ../Server/
cp ./Server/*.json ../Server/
cd ../Server
git add .
git commit -m 'update@'$CurrentVersion
git push $RemoteRepo master
#ssh ubuntu@$DeployServer '(cd ~/Server; pm2 start ./processes.json; pm2 restart all)'

#elif [ $CurrentBranch = master ]
#then
#  ScriptName=serverOp.sh
#  rm -f $ScriptName
#  WorkerList="
#  10.4.2.185
#  "
#  for ip in $WorkerList
#  do
#    echo ssh ubuntu@$ip '(cd ~/server; pm2 start ./processes.json; pm2 restart all)' >> $ScriptName
#  done
#  scp ./$ScriptName ubuntu@$DeployServer:~/
#  ssh ubuntu@$DeployServer 'cd ~; bash ./'$ScriptName')'
#fi
