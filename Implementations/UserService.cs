using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using NetDeveloperTest.Interfaces;
using NetDeveloperTest.Models;
using NetDeveloperTest.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NetDeveloperTest.Implementations
{
    public class UserService : AsyncRepository<User>, IUserService
    {
        private readonly User_ProjectContext _user_ProjectContext;
        private readonly IOptions<ConnectionString> config;
        public UserService(User_ProjectContext context, IOptions<ConnectionString> config) : base(context)
        {
            _user_ProjectContext = context;
            this.config = config;
        }

        public User GetUserByEmail(string email)
        {
            var user = new User();
            var optionsBuilder = new DbContextOptionsBuilder<User_ProjectContext>();
            optionsBuilder.UseSqlServer(config.Value.UserProjectDb);
            using (var context = new User_ProjectContext(optionsBuilder.Options))
            {
                user = context.User.Where(x => x.Email == email).FirstOrDefault();
            }
            return user;
        }
    }
}
