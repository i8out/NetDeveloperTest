using NetDeveloperTest.Interfaces;
using NetDeveloperTest.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NetDeveloperTest.Implementations
{
    public class UserService : AsyncRepository<User>, IUserService
    {
        private readonly User_ProjectContext _user_ProjectContext;
        public UserService(User_ProjectContext context) : base(context)
        {
            _user_ProjectContext = context;
        }
    }
}
