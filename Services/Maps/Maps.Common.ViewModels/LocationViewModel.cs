using System;

namespace Maps.Common.ViewModels
{
    public class LocationViewModel
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public double Longitude { get; set; }
        public double Latitude { get; set; }
        public long CityId { get; set; }
        public string City { get; set; }
    }
}
