FROM mcr.microsoft.com/dotnet/sdk:2.1.816-focal AS build-env

WORKDIR /app

COPY BackendAPI BackendAPI
COPY ClassLibrary ClassLibrary
WORKDIR /app/BackendAPI
RUN sed -i "s/\"DefaultConnection\":.*/\"DefaultConnection\": \"Server=mssql;Database=L_Database;MultipleActiveResultSets=true;User=SA;Password=\My\!P@ssw0rd1\"/g" appsettings.json
RUN dotnet build
RUN dotnet publish -c Debug -o out
RUN ls out

FROM mcr.microsoft.com/dotnet/aspnet:2.1
WORKDIR /app
COPY --from=build-env /app/BackendAPI/out .

EXPOSE 80
ENTRYPOINT dotnet BackendAPI.dll