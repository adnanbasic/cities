using Maps.Core.Domain.Interfaces;

namespace Maps.Core.Domain.Entities
{
    public class Location: IBaseEntity, IDeleted
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public double Longitude { get; set; }
        public double Latitude { get; set; }
        public long CityId { get; set; }
        public City City { get; set; }
        public bool Deleted { get; set; }
    }
}
