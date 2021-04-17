using BackendAPI.Data;
using BackendAPI.Helpers;
using BackendAPI.Models;
using BackendAPI.Repository.Interfaces;
using ClassLibrary;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace BackendAPI.Repository.Repositories
{
    public class UserRepository: GenericRepository<User>, IUserRepository
    {
        private readonly JwtSettings jwtSettings;

        public UserRepository(CommonDataContext dbContext, IOptions<JwtSettings> jwtSettings) : base(dbContext)
        {
            this.jwtSettings = jwtSettings.Value;
        }

        public AuthenticateResponse Authenticate(AuthenticateRequest model)
        {
            User user;
            using (var stringHash = new StringHash())
            {
                var passwordHash = stringHash.GetHash(model.Password);
                user = dbContext.Users.FirstOrDefault(x => x.Login == model.Login && stringHash.CompareHashes(passwordHash, x.PasswordHash));
            }
            // return null if user not found
            if (user == null) return null;

            // authentication successful so generate jwt token
            var token = generateJwtToken(user);

            return new AuthenticateResponse() { Token = token };
        }

        private string generateJwtToken(User user)
        {
            // generate token that is valid for 7 days
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(jwtSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                //Do ról wystarczy potem tutaj dopisać w Claimach rolę
                //https://jasonwatmore.com/post/2019/10/16/aspnet-core-3-role-based-authorization-tutorial-with-example-api
                Subject = new ClaimsIdentity(new[] { new Claim(ClaimTypes.NameIdentifier, user.ID.ToString()) }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        public override bool Delete(int ID)
        {
            User user = GetByID(ID);
            if (user == null)
                return false;
            dbContext.Users.Remove(user);
            return true;

        }

        public override IList<User> Get(IncludeData<User> includeFilter = null)
        {
            if (includeFilter == null)
                return dbContext.Users.ToList();
            return includeFilter(dbContext.Users).ToList();
        }

        public override User GetByID(int ID, IncludeData<User> includeFilter = null)
        {
            return Get(includeFilter).FirstOrDefault(b => b.ID == ID);
        }

        public User Get(Bike component)
        {
            var user =
               (from r in dbContext.Rentals.Include(r => r.User)
                where r.BikeID == component.ID && r.EndDate == null
                select r.User).FirstOrDefault();
            //user może być nullem
            return user;
        }

        public override bool Insert(User component)
        {
            dbContext.Add(component);
            return true;
        }
    }
}
