using BackendAPI.Models;
using ClassLibrary;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackendAPI.ModelsConfigurations.TestConfiguration
{
    public class UserConfiguration : BackendAPI.ModelsConfigurations.CommonConfiguration.UserConfiguration
    {
        public override void Configure(EntityTypeBuilder<User> builder)
        {
            base.Configure(builder);

            using (StringHash stringHash = new StringHash())
            {
                builder.HasData(
                    new User {ID = 1, Name = "ImieTestowe", LastName = "NazwiskoTestowe", Login = "login1", PasswordHash = stringHash.GetHash("pass1"), Role = Role.User },
                    new User { ID = 2, Name = "Imie2", LastName = "Nazwisko2", Login = "login2", PasswordHash = stringHash.GetHash("pass2"), Role = Role.User },
                    new User { ID = 3, Name = "Grzegorz", LastName = "Brzęczeszykiewicz", Login = "login3", PasswordHash = stringHash.GetHash("pass3"), Role = Role.User },
                    new User { ID = 4, Name = "Imie3", LastName = "Nazwisko3", Login = "login4", PasswordHash = stringHash.GetHash("pass4"), Role = Role.User },
                    new User { ID = 5, Name = "dsds", LastName = "das", Login = "login5", PasswordHash = stringHash.GetHash("pass5"), Role = Role.User },
                    new User { ID = 6, Name = "TechName", LastName = "TechLastName", Login = "tech2", PasswordHash = stringHash.GetHash("tech2"), Role = Role.Tech },
                    new User { ID = 7, Name = "AdminName", LastName = "AdminLastName", Login = "admin", PasswordHash = stringHash.GetHash("admin"), Role = Role.Admin },
                    new User {  ID = 8, Name = "TechName", LastName = "TechLastName", Login = "tech", PasswordHash = stringHash.GetHash("tech"), Role = Role.Tech}
                );
            }
        }
    }
}
