FROM mcr.microsoft.com/dotnet/sdk:2.1.816-focal
WORKDIR /
EXPOSE 5000
EXPOSE 5001

RUN git clone https://github.com/io2-2021-wed-brodka/L_Combine
RUN sed -i "s/\"DefaultConnection\":.*/\"DefaultConnection\": \"Server=mssql;Database=L_Database;MultipleActiveResultSets=true;User=SA;Password=\My\!P@ssw0rd1\"/g" L_Combine/Backend/BackendAPI/appsettings.json
RUN sed -i "s/\"Microsoft\":.*/\"Microsoft\": \"Debug\",/g" L_Combine/Backend/BackendAPI/appsettings.json
#RUN cat L_Combine/Backend/BackendAPI/appsettings.json
RUN dotnet build L_Combine/Backend/BackendAPI/

ENTRYPOINT dotnet run -p L_Combine/Backend/BackendAPI/ --server.urls http://*:80