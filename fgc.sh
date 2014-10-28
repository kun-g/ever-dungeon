Data=$1
Top=$2
Code=$3

cd data
git checkout $Data
cd ..
git checkout $Top

cd server
git checkout $Code
