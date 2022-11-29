using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Quiz.Core.Repositories
{
    public interface IRepository<TEntity>
    {
        Task AddAsync(TEntity entity);
        Task<List<TEntity>> GetAllAsync(Expression<Func<TEntity, bool>> expression, params string[] includes);
        Task<List<TEntity>> GetAllAsyncInclude(Expression<Func<TEntity, bool>> expression, params string[] includes);
        Task<TEntity> GetAsync(Expression<Func<TEntity, bool>> expression, params string[] includes);
        Task<bool> IsExistAsync(Expression<Func<TEntity, bool>> expression);
        void Remove(TEntity entity);
        Task<TEntity> FindByEmail(Expression<Func<TEntity, bool>> expression);
        Task<int> CommitAsync();
        int Commit();
    }
}
