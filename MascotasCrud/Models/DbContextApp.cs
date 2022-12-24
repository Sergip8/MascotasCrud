using Microsoft.EntityFrameworkCore;

namespace MascotasCrud.Models
{
    public class DbContextApp : DbContext
    {
        public DbContextApp(DbContextOptions<DbContextApp> options): base(options)
        {

        }
        public DbSet<Mascota> Mascota { get; set; }
    }
}
