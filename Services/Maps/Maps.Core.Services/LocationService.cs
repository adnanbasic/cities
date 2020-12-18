using Maps.Common.Exceptions;
using Maps.Common.ViewModels;
using Maps.Core.Domain.Entities;
using Maps.Core.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Maps.Core.Services
{
    public class LocationService : ILocationsService
    {
        public readonly IMapsContext _mapsContext;
        public readonly ILogger<LocationService> _logger;

        public LocationService(IMapsContext mapsContext,
            ILogger<LocationService> logger)
        {
            _mapsContext = mapsContext;
            _logger = logger;
        }

        public async Task<List<LocationViewModel>> GetAsync(CancellationToken cancellationToken)
        {
            try
            {
                var allLocations = await _mapsContext.Locations
                    .Select(x => new LocationViewModel
                    {
                        Id = x.Id,
                        Name = x.Name,
                        Address = x.Address,
                        CityId = x.CityId,
                        City = x.City.Name,
                        Longitude = x.Longitude,
                        Latitude = x.Latitude,
                    })
                    .ToListAsync(cancellationToken);
                return allLocations;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message, ex);
                throw ex;
            }
        }

        public async Task<LocationViewModel> GetByIdAsync(long id, CancellationToken cancellationToken)
        {
            try
            {
                var existingLocation = await _mapsContext.Locations
                    .Select(x => new LocationViewModel
                    {
                        Id = x.Id,
                        Name = x.Name,
                        Address = x.Address,
                        CityId = x.CityId,
                        City = x.City.Name,
                        Longitude = x.Longitude,
                        Latitude = x.Latitude,
                    })
                    .FirstOrDefaultAsync(x => x.Id == id, cancellationToken);

                if (existingLocation == null)
                {
                    throw new NotFoundException("Location not found!");
                }

                return existingLocation;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message, ex);
                throw ex;
            }
        }

        public async Task CreateAsync(LocationViewModel locationViewModel, CancellationToken cancellationToken)
        {
            try
            {
                await _mapsContext.Locations.AddAsync(new Location
                {
                    Name = locationViewModel.Name,
                    Address = locationViewModel.Address,
                    CityId = locationViewModel.CityId,
                    Latitude = locationViewModel.Latitude,
                    Longitude = locationViewModel.Longitude
                }, cancellationToken);

                await _mapsContext.SaveChangesAsync(cancellationToken);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message, ex);
                throw ex;
            }
        }

        public async Task UpdateAsync(long id, LocationViewModel locationViewModel, CancellationToken cancellationToken)
        {
            try
            {
                var existingLocation = await _mapsContext.Locations.FirstOrDefaultAsync(x => x.Id == id, cancellationToken);

                if (existingLocation == null)
                {
                    throw new NotFoundException("Location not found!");
                }

                existingLocation.Name = locationViewModel.Name;
                existingLocation.Address = locationViewModel.Address;
                existingLocation.CityId = locationViewModel.CityId;
                existingLocation.Longitude = locationViewModel.Longitude;
                existingLocation.Latitude = locationViewModel.Latitude;

                await _mapsContext.SaveChangesAsync(cancellationToken);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message, ex);
                throw ex;
            }
        }

        public async Task DeleteAsync(long id, CancellationToken cancellationToken)
        {
            try
            {
                var existingLocation = await _mapsContext.Locations.FirstOrDefaultAsync(x => x.Id == id, cancellationToken);

                if (existingLocation == null)
                {
                    throw new NotFoundException("Location not found!");
                }

                _mapsContext.Locations.Remove(existingLocation);
                await _mapsContext.SaveChangesAsync(cancellationToken);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message, ex);
                throw ex;
            }
        }
    }
}
