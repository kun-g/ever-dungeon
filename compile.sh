#!/bin/bash
SED=${SED:-sed}

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
cp package.json $CurrentPWD/build

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
"seed_random.js"
"commandStream.js"
"dungeon.js"
"trigger.js"
)

DST_BOX="blackbox/"
for itm in ${SOURCES[*]}
do
  cp -f build/${itm} ${DST_BOX}${itm}

  f=$DST_BOX$itm
  LibName=`echo "$itm" | $SED -e 's/\(\w\+\).js/lib\u\1/'`

  $SED -i '1s/^/'$LibName' = {};\n/' $f 
  $SED -i 's/exports/'$LibName'/' $f 
  $SED -i "s/DBWrapper = require('\.\/dbWrapper').DBWrapper;//" $f
  $SED -i "s/require('\.\/shared');//g" $f
  $SED -i "s/async = require('async');//g" $f
  $SED -i "s/require('\.\/define');//g" $f
  $SED -i "s/require('\.\/\(.*\)')/lib\u\1/g" $f
  $SED -i "s/require('\(.*\)')/lib\u\1/g" $f
done

#cd $DST_BOX
#
#ls *.js | $JSBCC -p
#rm -rf before_compile
#mkdir before_compile
#mv *.js before_compile
#
#cd ../

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


echo 'get VersionInfo by redis-cli from 10.4.3.41, if this step cost so much time, may be
your vpn is stop'
CurrentVersion=`redis-cli -h 10.4.3.41 --raw get $VersionKey`
echo 'Current version: '$CurrentVersion
$SED -ig 's#"url":.*,#"url": "'$UpdateUrl'",#g' $VersionFile
$SED -ig 's/"resource_version": .*,/"resource_version": '$CurrentVersion',/g' $VersionFile
$SED -ig 's/"ServerName": .*,/"ServerName": "'$ServerConfiguration'",/g' $ConfigFile
$SED -ig 's/"ServerID": .*,/"ServerID": "'$ServerID'",/g' $ConfigFile
$SED -ig 's/"DataVer": .*,/"DataVer": "'$SubModuleData'",/g' $ConfigFile

# Commit
echo '===== Commit the changes ====='
echo 'Commit changes branch:'$CurrentBranch @ $CurrentVersion  Server: $SubModuleServer Table: $SubModuleData
git commit -am "Commit changes branch:"$CurrentBranch" @ "$CurrentVersion" Server:"$SubModuleServer" Table:"$SubModuleData

git push $RemoteRepo

if [ $CurrentBranch = master ]
then
  git push github
fi
