#!/bin/bash
Version=$1
SEARCH_DIR=($@)

#if file name with -trin ,then it must be mulity version file.
#but if can't find file's name with -xxx. use xxx-trin as default


for ((i=1; i <${#SEARCH_DIR[@]}; i++))
do
  dir=${SEARCH_DIR[$i]}
  mulityVersionFileList=`(ls $dir/*-trin.*)`

  for fileWithPath in $mulityVersionFileList
  do
    targetFile=`(echo $fileWithPath | sed -e 's/-trin//g')`
    removeFils=`(echo $fileWithPath | sed -e 's/-trin/-*/g')`
    wantFile=`(echo $fileWithPath | sed -e 's/-trin/-'$1'/g')`
    if [ -e $wantFile ]
    then
      sourceFile=$wantFile
    else
      sourceFile=$fileWithPath
    fi

    cp $sourceFile $targetFile 
    rm $removeFils 
  done
done


