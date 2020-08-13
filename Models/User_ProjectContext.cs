using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NetDeveloperTest.Models
{
    public class User_ProjectContext : DbContext
    {
        public User_ProjectContext()
        {
        }

        public User_ProjectContext(DbContextOptions<User_ProjectContext> options)
            : base(options)
        {
        }

        public virtual DbSet<User> User { get; set; }
    }
}
