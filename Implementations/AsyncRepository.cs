using Microsoft.EntityFrameworkCore;
using NetDeveloperTest.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using static NetDeveloperTest.Interfaces.IAsyncRepository;

namespace NetDeveloperTest.Implementations
{
    public class AsyncRepository<T> : IAsyncRepository<T> where T : class
    {
        #region Fields

        protected User_ProjectContext Context;
        //private Chatbizz_ProjectContext _context = null;
        private DbSet<T> table = null;

        public AsyncRepository(User_ProjectContext context)
        {
            Context = context;
            table = context.Set<T>();
        }

        public async Task Add(T entity)
        {
            await Context.Set<T>().AddAsync(entity);
            await Context.SaveChangesAsync();
        }

        public Task<int> CountAll()
        {
            throw new NotImplementedException();
        }

        public Task<int> CountWhere(Expression<Func<T, bool>> predicate)
        {
            throw new NotImplementedException();
        }

        public Task<T> FirstOrDefault(Expression<Func<T, bool>> predicate)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<T>> GetAll()
        {
            return await Context.Set<T>().ToListAsync();
        }

        public T GetById(object id)
        {
            return Context.Set<T>().Find(id);
        }

        public Task<IEnumerable<T>> GetWhere(Expression<Func<T, bool>> predicate)
        {
            throw new NotImplementedException();
        }

        public Task Remove(T entity)
        {
            throw new NotImplementedException();
        }

        public async Task<bool> Update(T entity)
        {
            Context.Set<T>().Update(entity);
            await Context.SaveChangesAsync();
            return true;
        }

        #endregion
    }
}
