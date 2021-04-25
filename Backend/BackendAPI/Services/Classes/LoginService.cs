using BackendAPI.Data;
using BackendAPI.Helpers;
using BackendAPI.Models;
using BackendAPI.Services.Interfaces;
using ClassLibrary;
using ClassLibrary.DTO;
using ClassLibrary.Exceptions;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace BackendAPI.Services.Classes
{
    public class LoginService : Service, ILoginService
    {
        private readonly JwtSettings jwtSettings;

        public LoginService(DataContext dbContext,
            IOptions<JwtSettings> jwtSettings) : base(dbContext)
        {
            this.jwtSettings = jwtSettings.Value;
        }

        //[TEST]
        public AuthenticateResponseDTO Login(string login, string password)
        {
            User user;
            using (var stringHash = new StringHash())
            {
                var passwordHash = stringHash.GetHash(password);
                user = dbContext.Users.FirstOrDefault(x => x.Login == login && stringHash.CompareHashes(passwordHash, x.PasswordHash));
            }

            if (user == null)
                throw new HttpResponseException("Bad credentials", 401);

            // authentication successful so generate jwt token
            var token = generateJwtToken(user);

            return new AuthenticateResponseDTO() { Token = token, Role = user.Role.ToLower() };
        }

        //[TEST]
        public AuthenticateResponseDTO Register(string login, string password)
        {
            //Sprawdz, czy podany login istnieje juz w bazie
            if (dbContext.Users.Where(u => u.Login == login).Any())
                throw new HttpResponseException("Given login already exists in database.", 409);

            User user;
            using (StringHash stringHash = new StringHash())
            {
                user = new User()
                {
                    Login = login,
                    PasswordHash = stringHash.GetHash(password),
                    Name = "ROZSZERZYC_REJESTRACJE",
                    LastName = "ROZSZERZYC_REJESTRACJE",
                    Role = Role.User
                };
            }
            //Dodaj uzytkownika do bazy
            dbContext.Add(user);
            dbContext.SaveChanges();

            //Zwroc token
            var token = generateJwtToken(user);

            return new AuthenticateResponseDTO() { Token = token, Role = user.Role.ToLower() };
        }

        private string generateJwtToken(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(jwtSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                //Do ról wystarczy potem tutaj dopisać w Claimach rolę
                //https://jasonwatmore.com/post/2019/10/16/aspnet-core-3-role-based-authorization-tutorial-with-example-api
                Subject = new ClaimsIdentity(
                    new[]
                    {
                        new Claim(ClaimTypes.NameIdentifier, user.ID.ToString()),
                        new Claim(ClaimTypes.Role, user.Role),
                        //Jeśli user jest userem zwykłym i jest zablokowany
                        new Claim("Blocked", (user.Role == Role.User && user.Blocked).ToString())
                    }),
                Expires = DateTime.UtcNow.AddHours(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
