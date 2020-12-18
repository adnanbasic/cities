using Maps.Core.Domain.Entities;
using Maps.Core.Domain.Interfaces;
using Maps.Core.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Maps.Infrastructure.Database
{
    public class MapsContext : DbContext, IMapsContext
    {
        public DbSet<Location> Locations { get; set; }
        public DbSet<City> Cities { get; set; }

        public MapsContext(DbContextOptions<MapsContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(MapsContext).Assembly);

            SeedData.Seed(modelBuilder);
        }

        public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            MarkAsDeleted();

            return base.SaveChangesAsync(cancellationToken);
        }

        private void MarkAsDeleted()
        {
            ChangeTracker.DetectChanges();

            var markedAsDeletedOrModified = ChangeTracker.Entries().Where(x => x.State == EntityState.Deleted || x.State == EntityState.Modified);

            foreach (var item in markedAsDeletedOrModified)
            {
                if (item.State == EntityState.Deleted && item.Entity is IDeleted entity)
                {
                    entity.Deleted = true;
                    item.State = EntityState.Modified;
                }
            }
        }
    }
}
