using Maps.Common.ViewModels;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Maps.Core.Services.Interfaces
{
    public interface ICityService
    {
        Task<List<CityViewModel>> GetAsync(CancellationToken cancellationToken);
    }
}
