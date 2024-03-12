using Microsoft.EntityFrameworkCore;
using SkladisteAPI.Model.Entities;

namespace SkladisteAPI.Data
{
    public class SkladisteDbContext : DbContext
    {
        public SkladisteDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Skladiste> Skladista { get; set; }
        public DbSet<Proizvod> Proizvodi { get; set; }
        public DbSet<SkladisteProizvod> SkladisteProizvodi { get; set; }
    }
}
