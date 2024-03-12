using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SkladisteAPI.Data;
using SkladisteAPI.Model.Entities;

namespace SkladisteAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProizvodController : ControllerBase
    {
        private readonly SkladisteDbContext skladistaDbContext;

        public ProizvodController(SkladisteDbContext skladistaDbContext)
        {
            this.skladistaDbContext = skladistaDbContext;
        }

        [HttpGet]
        public async Task<IActionResult> DohvatiProizvode()
        {
            return Ok(await skladistaDbContext.Proizvodi.ToListAsync());
        }

        [HttpPost]
        public async Task<IActionResult> DodajProizvod([FromBody] Proizvod proizvod)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    await skladistaDbContext.Proizvodi.AddAsync(proizvod);
                    await skladistaDbContext.SaveChangesAsync();
                    return Ok();
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        public async Task<IActionResult> AzurirajProizvod([FromBody] Proizvod azuriranProizvod) {
           var proizvod = await skladistaDbContext.Proizvodi.FindAsync(azuriranProizvod.ID);
            if (proizvod == null)
            {
                return NotFound();
            }
            proizvod.Naziv = azuriranProizvod.Naziv;
            proizvod.Kategorija = azuriranProizvod.Kategorija;
            proizvod.Cena = azuriranProizvod.Cena;
            await skladistaDbContext.SaveChangesAsync();
            return Ok();
           
        }

        [HttpDelete]
        public async Task<IActionResult> ObrisiProizvod([FromBody] Proizvod obrisanProizvod)
        {
            var proizvod = await skladistaDbContext.Proizvodi.FindAsync(obrisanProizvod.ID);
            if (proizvod == null)
            {
                return NotFound();
            }
            skladistaDbContext.Proizvodi.Remove(proizvod);
            await skladistaDbContext.SaveChangesAsync();
            return Ok();
        }

    }
}
