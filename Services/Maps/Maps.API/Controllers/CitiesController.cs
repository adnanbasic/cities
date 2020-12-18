using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Maps.Common.Exceptions;
using Maps.Common.ViewModels;
using Maps.Core.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Maps.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CitiesController : ControllerBase
    {
        private readonly ICityService _cityService;

        public CitiesController(ICityService cityService)
        {
            _cityService = cityService;
        }

        [HttpGet]
        public async Task<ActionResult> Get(CancellationToken cancellationToken)
        {
            try
            {
                return Ok(await _cityService.GetAsync(cancellationToken));
            }
            catch
            {
                return BadRequest();
            }
        }
    }
}
