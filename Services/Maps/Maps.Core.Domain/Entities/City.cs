using Maps.Core.Domain.Interfaces;

namespace Maps.Core.Domain.Entities
{
    public class City: IBaseEntity, IDeleted
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public bool Deleted { get; set; }
    }
}
