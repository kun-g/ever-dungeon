#!/bin/bash

OnlyCompile=0
NotSwitchBranch=0

case "$@" in
  -n | --notswitchbranch)
    shift
    NotSwitchBranch=1
    ;;
  -c | --onlycompile)
    shift
    OnlyCompile=1
    ;;
esac

#echo $NotSwitchBranch
#echo $OnlyCompile
#exit

CurrentBranch=`git branch | awk 'BEGIN{FS=" "}{if ($1=="*") print $2}'`

while [ "$CurrentBranch" = "master" ]; do
  read -p "Do you wish to update the MASTER branch(YES/NO):" yn
  case $yn in
    [YES]* ) break;;
    [NO]* ) exit;;
    * ) echo 'Please answer YES or NO';;
  esac
done

VersionFile="build/version.js"
ConfigFile="build/config.js"

CurrentPWD=`pwd`

echo '===== Compiling ====='
cd server
SubModuleServer=`git branch | awk 'BEGIN{FS=" "}{if ($1=="*") print $2}'`
gulp compile
cp js/*.js $CurrentPWD/build
cp src/*.js $CurrentPWD/build
cp package.js $CurrentPWD/build

#oc = only compile
if [ "$1" = "oc" ]
then
  cp src/*.js js
  exit
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

echo '===== Setting up variables ====='
if [ $CurrentBranch = develop ]
then
  CDNVersionBucket='hotupdate'
  RemoteRepo='origin'
  UpdateUrl='http://hotupdate.qiniudn.com'
  ServerConfiguration='Develop'
  VersionKey='LocalVersion'
  ServerID=0
  SubModuleData='develop'
elif [ $CurrentBranch = master ]
then
  CDNVersionBucket='drhu'
  RemoteRepo='deploy0'
  UpdateUrl='http://drhu.qiniudn.com'
  ServerConfiguration='Master'
  VersionKey='MasterVersion'
  ServerID=1
  SubModuleData='master'
elif [[ $CurrentBranch = localWork ]]
then
  CDNVersionBucket='hotupdate'
  RemoteRepo='origin'
  UpdateUrl='http://hotupdate.qiniudn.com'
  ServerConfiguration='Develop'
  VersionKey='LocalVersion'
  ServerID=0
  SubModuleData='develop'
else
  echo 'Invalid target branch'
  exit
fi

cd data
#git checkout $SubModuleData

if [ "$1" = "all" ]
then
	echo "Fetching table"
	git pull
fi

cd ..
cp data/table/*.js build/
cp data/stable/*.js build/


CurrentVersion=`redis-cli -h 10.4.3.41 --raw get $VersionKey`
echo 'Current version: '$CurrentVersion
sed -ig 's#"url":.*,#"url": "'$UpdateUrl'",#g' $VersionFile
sed -ig 's/"resource_version": .*,/"resource_version": '$CurrentVersion',/g' $VersionFile
sed -ig 's/"ServerName": .*,/"ServerName": "'$ServerConfiguration'",/g' $ConfigFile
sed -ig 's/"ServerID": .*,/"ServerID": "'$ServerID'",/g' $ConfigFile
sed -ig 's/"DataVer": .*,/"DataVer": "'$SubModuleData'",/g' $ConfigFile

# Commit
echo '===== Commit the changes ====='
echo 'Commit changes branch:'$CurrentBranch @ $CurrentVersion  Server: $SubModuleServer Table: $SubModuleData
git commit -am "Commit changes branch:"$CurrentBranch" @ "$CurrentVersion" Server:"$SubModuleServer" Table:"$SubModuleData

git push $RemoteRepo

git push github
