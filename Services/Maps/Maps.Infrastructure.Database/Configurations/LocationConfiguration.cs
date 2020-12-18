using Maps.Core.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Maps.Infrastructure.Database.Configurations
{
    public class LocationConfiguration : IEntityTypeConfiguration<Location>
    {
        public void Configure(EntityTypeBuilder<Location> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Id).HasColumnName("id").ValueGeneratedOnAdd().UseIdentityColumn();
            builder.ToTable("locations");
            builder.Property(x => x.Name).HasColumnName("name").IsRequired().HasMaxLength(20);
            builder.Property(x => x.Address).HasColumnName("address").IsRequired().HasMaxLength(50);
            builder.Property(x => x.Longitude).HasColumnName("longitude").IsRequired();
            builder.Property(x => x.Latitude).HasColumnName("latitude").IsRequired();
            builder.Property(x => x.CityId).HasColumnName("city_id").IsRequired();
            builder.Property(x => x.Deleted).HasColumnName("deleted").IsRequired();

            builder.HasQueryFilter(p => !p.Deleted);
        }
    }
}
