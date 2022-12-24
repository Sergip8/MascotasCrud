using Microsoft.EntityFrameworkCore;

namespace MascotasCrud.Models.Repository
{
    public class MascotaRepository : IMascotaRepository
    {
        private readonly DbContextApp _context;

        public MascotaRepository(DbContextApp context)
        {
            _context = context; 
        }

        public async Task<Mascota> AddMascota(Mascota mascota)
        {
            _context.Add(mascota);
            await _context.SaveChangesAsync();
            return mascota;
        }

        public async Task DeleteMascota(Mascota mascota)
        {
            _context.Mascota.Remove(mascota);
            await _context.SaveChangesAsync();

        }

        public async Task<List<Mascota>> GetListMascotas()
        {
           return await _context.Mascota.ToListAsync();
        }

        public async Task<Mascota> GetMascota(int id)
        {
            return await _context.Mascota.FindAsync(id);
        }

        public async Task UpdateMascota(Mascota mascota, Mascota mascotaItem)
        {
                
            mascotaItem.Nombre = mascota.Nombre;
            mascotaItem.Peso = mascota.Peso;
            mascotaItem.Raza = mascota.Raza;
            mascotaItem.Edad = mascota.Edad;
            mascotaItem.Color = mascota.Color;

            await _context.SaveChangesAsync();
        }
    }
}
