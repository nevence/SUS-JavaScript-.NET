using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SkladisteAPI.Model.Entities
{
    public class Proizvod
    {
        [Key] public int ID { get; set; }
        public string? Naziv { get; set; }
        public string? Kategorija { get; set; }
        public float? Cena { get; set; }

        [ForeignKey("ProizvodID")]
        public ICollection<SkladisteProizvod>? SkladisteProizvodi { get; set; }


    }
}