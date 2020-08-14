using NetDeveloperTest.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static NetDeveloperTest.Interfaces.IAsyncRepository;

namespace NetDeveloperTest.Interfaces
{
    public interface IUserService : IAsyncRepository<User>
    {
        User GetUserByEmail(string email);
    }
}
