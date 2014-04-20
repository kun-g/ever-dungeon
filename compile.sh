#!/bin/bash

CurrentBranch=`git branch | awk 'BEGIN{FS=" "}{if ($1=="*") print $2}'`

while [ "$CurrentBranch" = "master" ]; do
  read -p "Do you wish to update the MASTER branch(YES/NO):" yn
  case $yn in
    [YES]* ) break;;
    [NO]* ) exit;;
    * ) echo 'Please answer YES or NO';;
  esac
done

VersionFile="build/version.json"
ConfigFile="build/config.json"

CurrentPWD=`pwd`

echo '===== Compiling ====='
cd server
gulp compile
cp js/*.js $CurrentPWD/build
cp package.json $CurrentPWD/build
cd ../data
if [ "$1" = "all" ]
then
	echo "Fetching table"
	git pull
fi

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

echo '===== Setting up variables ====='
if [ $CurrentBranch = develop ]
then
  CDNVersionBucket='hotupdate'
  RemoteRepo='origin'
  UpdateUrl='http://hotupdate.qiniudn.com'
  ServerConfiguration='Develop'
  ServerID=0
elif [ $CurrentBranch = master ]
then
  CDNVersionBucket='drhu'
  RemoteRepo='deploy0'
  UpdateUrl='http://drhu.qiniudn.com'
  ServerConfiguration='Master'
  ServerID=1
elif [[ $CurrentBranch = localWork ]]
then
  CDNVersionBucket='hotupdate'
  RemoteRepo='origin'
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

# Commit
echo '===== Commit the changes ====='
git commit -am 'Commit changes branch:'$CurrentBranch' @ '$CurrentVersion

git push $RemoteRepo
