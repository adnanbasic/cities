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
    public class LocationsController : ControllerBase
    {
        private readonly ILocationsService _locationsService;

        public LocationsController(ILocationsService locationsService)
        {
            _locationsService = locationsService;
        }

        [HttpGet]
        public async Task<ActionResult> Get(CancellationToken cancellationToken)
        {
            try
            {
                return Ok(await _locationsService.GetAsync(cancellationToken));
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetById(long id, CancellationToken cancellationToken)
        {
            try
            {
                return Ok(await _locationsService.GetByIdAsync(id, cancellationToken));
            }
            catch (NotFoundException)
            {
                return NotFound();
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpPost]
        public async Task<ActionResult> CreateAsync(LocationViewModel locationViewModel, CancellationToken cancellationToken)
        {
            try
            {
                await _locationsService.CreateAsync(locationViewModel, cancellationToken);
                return Ok();
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateAsync(long id, LocationViewModel locationViewModel, CancellationToken cancellationToken)
        {
            try
            {
                await _locationsService.UpdateAsync(id, locationViewModel, cancellationToken);
                return Ok();
            }
            catch (NotFoundException)
            {
                return NotFound();
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteAsync(long id, CancellationToken cancellationToken)
        {
            try
            {
                await _locationsService.DeleteAsync(id, cancellationToken);
                return Ok();
            }
            catch (NotFoundException)
            {
                return NotFound();
            }
            catch
            {
                return BadRequest();
            }
        }
    }
}
