#! /bin/bash

set -e

cd BackendAPI
until dotnet ef database update 0 --no-build --context BackendAPI.Data.DataContext; do
>&2 echo "SQL Server is starting up"
sleep 3
done

dotnet ef database update --no-build --context BackendAPI.Data.DataContext
dotnet out/BackendAPI.dll