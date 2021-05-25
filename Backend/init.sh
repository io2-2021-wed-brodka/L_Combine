#! /bin/bash

set -e

cd BackendAPI
until dotnet ef database update --no-build --context BackendAPI.Data.DataContext; do
>&2 echo "SQL Server is starting up"
sleep 3
done

dotnet out/BackendAPI.dll