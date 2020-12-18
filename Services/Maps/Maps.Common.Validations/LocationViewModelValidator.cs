using FluentValidation;
using Maps.Common.ViewModels;

namespace Maps.Common.Validations
{
    public class LocationViewModelValidator : AbstractValidator<LocationViewModel>
    {
        public LocationViewModelValidator()
        {
            RuleFor(n => n.Name).NotEmpty().MaximumLength(20);
            RuleFor(n => n.Address).NotEmpty().MaximumLength(50);
            RuleFor(n => n.Longitude).NotEmpty().GreaterThanOrEqualTo(-180).LessThanOrEqualTo(180);
            RuleFor(n => n.Latitude).NotEmpty().GreaterThanOrEqualTo(-90).LessThanOrEqualTo(90);
            RuleFor(n => n.CityId).NotEmpty().GreaterThan(0);
        }
    }
}
