using Maps.Core.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;

namespace Maps.Core.Services.Interfaces
{
    public interface IMapsContext
    {
        DbSet<Location> Locations { get; set; }
        DbSet<City> Cities { get; set; }

        Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
    }
}
