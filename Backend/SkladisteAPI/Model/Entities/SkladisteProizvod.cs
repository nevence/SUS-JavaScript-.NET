using System.ComponentModel.DataAnnotations;

namespace SkladisteAPI.Model.Entities
{
    public class SkladisteProizvod
    {
        [Key]
        public int ID { get; set; }
        public int? SkladisteID { get; set; }
        public Skladiste? Skladiste { get; set; }
        public int? ProizvodID { get; set; }
        public Proizvod? Proizvod { get; set; }
        public required int Kolicina { get; set; }
    }
}