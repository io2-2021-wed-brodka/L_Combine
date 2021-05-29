#! /bin/bash

PROJECT_PATH=$1

dotnet ef database update 0 --no-build --context --project ${PROJECT_PATH} BackendAPI.Data.DataContext
dotnet ef database update --no-build --context --project ${PROJECT_PATH} BackendAPI.Data.DataContext