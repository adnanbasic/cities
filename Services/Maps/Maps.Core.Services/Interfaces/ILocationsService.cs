using Maps.Common.ViewModels;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Maps.Core.Services.Interfaces
{
    public interface ILocationsService
    {
        Task<List<LocationViewModel>> GetAsync(CancellationToken cancellationToken);
        Task<LocationViewModel> GetByIdAsync(long id, CancellationToken cancellationToken);
        Task CreateAsync(LocationViewModel locationViewModel, CancellationToken cancellationToken);
        Task UpdateAsync(long id, LocationViewModel locationViewModel, CancellationToken cancellationToken);
        Task DeleteAsync(long id, CancellationToken cancellationToken);
    }
}
