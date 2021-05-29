#! /bin/bash

set -e

TEST_PATH=$1
PROJECT_PATH=$2

#Fukcja czyści baze i ustawia ponownie dla wybranego kontekstu
function clean_database () {
    dotnet ef database update 0 --no-build --context --project ${PROJECT_PATH} BackendAPI.Data.DataContext
    dotnet ef database update --no-build --context --project ${PROJECT_PATH} BackendAPI.Data.DataContext
}

function run_test () {
    newman run $1 --insecure
    return $?
}

cp -f ${PROJECT_PATH}/appsettings.Linux.json ${PROJECT_PATH}/appsettings.json 
echo "Kopiowanie konfiguracji"
for fun in `ls ${TEST_PATH}`
do
    echo "Testing ${fun}" 
    clean_database #> /dev/null
    run_test "${TEST_PATH}/${fun}"

    #W przypadku nieudanego testu, zwroc 1
    if [[ $? -ne 0 ]]
    then
        clean_database > /dev/null
        exit 1
    fi
done
clean_database > /dev/null
