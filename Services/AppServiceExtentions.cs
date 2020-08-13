using Microsoft.Extensions.DependencyInjection;
using NetDeveloperTest.Implementations;
using NetDeveloperTest.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static NetDeveloperTest.Interfaces.IAsyncRepository;

namespace NetDeveloperTest.Services
{
    public static class AppServiceExtentions
    {
        public static void ConfigureDIPortal(this IServiceCollection services)
        {
            services.AddScoped(typeof(IAsyncRepository<>), typeof(AsyncRepository<>));
            services.AddScoped<IUserService, UserService>();
        }
    }
}
