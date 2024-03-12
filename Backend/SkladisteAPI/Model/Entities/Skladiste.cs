using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SkladisteAPI.Model.Entities
{
    public class Skladiste
    {
        [Key]
        public int ID { get; set; }
        public string? Naziv { get; set; }
        public string? Adresa { get; set; } 
        public int? Kapacitet { get; set;}
        public int? Popunjeno { get; set; } = 0;

        [ForeignKey("SkladisteID")]

        public ICollection<SkladisteProizvod>? SkladisteProizvodi { get; set; }

        public void AzurirajPopunjeno()
        {
            Popunjeno = SkladisteProizvodi.Sum(sp => sp.Kolicina);
        }

    }
}
