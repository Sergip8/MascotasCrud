using System.ComponentModel.DataAnnotations;

namespace MascotasCrud.Models
{
    public class Mascota
    {
        [Key]
        public int? Id { get; set; }

        public string Nombre { get; set; }
        
        public string Color { get; set; }

        public string Raza { get; set; }

        public int Edad { get; set; }

        public float Peso { get; set; }

        public DateTime FechaCreacion { get; set; } 

    }
}
