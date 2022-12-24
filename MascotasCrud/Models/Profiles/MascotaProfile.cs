using AutoMapper;
using MascotasCrud.Models.DTO;

namespace MascotasCrud.Models.Profiles
{
    public class MascotaProfile: Profile
    {
        public MascotaProfile()
        {
        CreateMap<Mascota, MascotaDTO>();
        CreateMap<MascotaDTO, Mascota>();

        }

        
    }
}
