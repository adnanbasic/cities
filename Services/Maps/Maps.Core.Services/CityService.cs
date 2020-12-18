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
    public class CityService : ICityService
    {
        public readonly IMapsContext _mapsContext;
        public readonly ILogger<CityService> _logger;

        public CityService(IMapsContext mapsContext,
            ILogger<CityService> logger)
        {
            _mapsContext = mapsContext;
            _logger = logger;
        }

        public async Task<List<CityViewModel>> GetAsync(CancellationToken cancellationToken)
        {
            try
            {
                var allCities = await _mapsContext.Cities
                    .Select(x => new CityViewModel
                    {
                        Id = x.Id,
                        Name = x.Name
                    })
                    .ToListAsync(cancellationToken);
                return allCities;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message, ex);
                throw ex;
            }
        }

    }
}
