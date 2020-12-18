using Maps.Core.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Maps.Infrastructure.Database.Configurations
{
    public class CityConfiguration : IEntityTypeConfiguration<City>
    {
        public void Configure(EntityTypeBuilder<City> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Id).HasColumnName("id").ValueGeneratedOnAdd().UseIdentityColumn();
            builder.ToTable("cities");
            builder.Property(x => x.Name).HasColumnName("name").IsRequired().HasMaxLength(20);
            builder.Property(x => x.Deleted).HasColumnName("deleted").IsRequired();

            builder.HasQueryFilter(p => !p.Deleted);
        }
    }
}
