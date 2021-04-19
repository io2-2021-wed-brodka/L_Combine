using BackendAPI.Models;
using BackendAPI.ModelsConfigurations.CommonConfiguration;
using ClassLibrary;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackendAPI.ModelsConfigurations.TestConfigurations
{
    //Konfiguracja i dane poczatkowe do tabeli testowej
    public class UserTestConfiguration : UserCommonConfiguration, IEntityTypeConfiguration<User>
    {
        public new void Configure(EntityTypeBuilder<User> builder)
        {
            base.Configure(builder);

            //Tutaj definicja danych zaladowanych do bazy testowej
            //albo dodatkowe zaleznosci na tabeli
            using (StringHash stringHash = new StringHash())
            {
                builder.HasData(
                new User { ID = 1, Name = "ImieTestowe", LastName = "NazwiskoTestowe", Login = "login1", PasswordHash = stringHash.GetHash("pass1") },
                new User { ID = 2, Name = "Imie2", LastName = "Nazwisko2", Login = "login2", PasswordHash = stringHash.GetHash("pass2") },
                new User { ID = 3, Name = "Grzegorz", LastName = "Brzęczeszykiewicz", Login = "login3", PasswordHash = stringHash.GetHash("pass3") },
                new User { ID = 4, Name = "Imie3", LastName = "Nazwisko3", Login = "login4", PasswordHash = stringHash.GetHash("pass4") },
                new User { ID = 5, Name = "PostmanUserName", LastName = "PostmanUserLastName", Login = "PostmanUser", PasswordHash = stringHash.GetHash("PostmanUserPass") }
                );
            }
        }
    }
}
