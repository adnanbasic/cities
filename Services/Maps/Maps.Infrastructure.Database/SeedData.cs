using Maps.Core.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Maps.Infrastructure.Database
{
    public static class SeedData
    {
        public static void Seed(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<City>().HasData(
                new City
                {
                    Id = 1L,
                    Name = "Berlin"
                },
                new City
                {
                    Id = 2L,
                    Name = "Amsterdam"
                },
                new City
                {
                    Id = 3L,
                    Name = "Ljubljana"
                },
                new City
                {
                    Id = 4L,
                    Name = "Belgrade"
                },
                new City
                {
                    Id = 5L,
                    Name = "Zagreb"
                },
                new City
                {
                    Id = 6L,
                    Name = "Sarajevo"
                },
                new City
                {
                    Id = 7L,
                    Name = "Rome"
                },
                new City
                {
                    Id = 8L,
                    Name = "Paris"
                },
                new City
                {
                    Id = 9L,
                    Name = "Madrid"
                },
                new City
                {
                    Id = 10L,
                    Name = "Istanbul"
                },
                new City
                {
                    Id = 11L,
                    Name = "Moscow"
                },
                new City
                {
                    Id = 12L,
                    Name = "Stockholm"
                }
            );
        }
    }
}
