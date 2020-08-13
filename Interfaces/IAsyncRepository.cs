﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace NetDeveloperTest.Interfaces
{
    public interface IAsyncRepository
    {
        public interface IAsyncRepository<T> where T : class
        {
            T GetById(object id);
            Task<T> FirstOrDefault(Expression<Func<T, bool>> predicate);

            Task Add(T entity);
            Task<bool> Update(T entity);
            Task Remove(T entity);

            Task<IEnumerable<T>> GetAll();
            Task<IEnumerable<T>> GetWhere(Expression<Func<T, bool>> predicate);

            Task<int> CountAll();
            Task<int> CountWhere(Expression<Func<T, bool>> predicate);
        }
    }
}
