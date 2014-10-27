#!/bin/bash
Version=$1
SEARCH_DIR=($@)

#if file name with -multi ,then it must be multiple version file.
#but if can't find file's name includes -multy-xxx, use -multi as default

for ((i=1; i <${#SEARCH_DIR[@]}; i++))
do
  dir=${SEARCH_DIR[$i]}
  multiVersionFileList=`(ls $dir/*-multi.*)`

  for fileWithPath in $multiVersionFileList
  do
    targetFile=`(echo $fileWithPath | $SED -e 's/-multi//g')`
    removeFiles=`(echo $fileWithPath | $SED -e 's/-multi/-multi*/g')`
    wantedFile=`(echo $fileWithPath | $SED -e 's/-multi/-multi-'$1'/g')`
    if [ -e $wantedFile ]
    then
      sourceFile=$wantedFile
    else
      sourceFile=$fileWithPath
    fi

    cp -f $sourceFile $targetFile 
    rm -f $removeFiles 
  done
done


