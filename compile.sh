#!/bin/bash

CurrentPWD=`pwd`

rm -r build
mkdir build
echo '===== Compiling ====='
cd ../cheer
gulp compile
cp js/*.js $CurrentPWD/build
cd -
cp src/*.js ./build

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
