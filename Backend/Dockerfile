FROM mcr.microsoft.com/dotnet/sdk:2.1

WORKDIR /app

COPY BackendAPI BackendAPI
COPY ClassLibrary ClassLibrary
COPY init.sh init.sh
WORKDIR /app/BackendAPI
RUN sed -i "s/\"DefaultConnection\":.*/\"DefaultConnection\": \"Server=mssql;Database=L_Database;MultipleActiveResultSets=true;User=SA;Password=\My\!P@ssw0rd1\"/g" appsettings.Production.json
#RUN cat appsettings.json
RUN dotnet tool install --global --version 2.1 dotnet-ef
ENV PATH="${PATH}:/root/.dotnet/tools"
RUN dotnet ef --version
RUN dotnet build
RUN dotnet publish -o out
#RUN ls out

EXPOSE 80
WORKDIR /app
ENTRYPOINT ["/bin/bash", "init.sh"]