using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SkladisteAPI.Data;
using SkladisteAPI.Model.Entities;

namespace SkladisteAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SkladisteController : ControllerBase
    {
        private readonly SkladisteDbContext skladistaDbContext;

        public SkladisteController(SkladisteDbContext skladistaDbContext)
        {
            this.skladistaDbContext = skladistaDbContext;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllSkladista()
        {
            return Ok(await skladistaDbContext.Skladista.ToListAsync());

        }

        [HttpGet]
        [Route("{id}")]

        public async Task<IActionResult> GetSkladisteByID([FromRoute] int id)
        {
            var skladiste = await skladistaDbContext.Skladista.FindAsync(id);
            if(skladiste == null)
            {
                return NotFound();
            }
            return Ok(skladiste);

        }

        [HttpPost]
        public async Task<IActionResult> DodajSkladiste([FromBody] Skladiste skladiste)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    await skladistaDbContext.Skladista.AddAsync(skladiste);
                    await skladistaDbContext.SaveChangesAsync();
                    return Ok();
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception ex) { 
                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        public async Task<IActionResult> AzurirajSkladiste([FromBody] Skladiste azuriranoSkladiste)
        {
            var skladiste = await skladistaDbContext.Skladista.FindAsync(azuriranoSkladiste.ID);
            if(skladiste == null)
            {
                return NotFound();
            }
            skladiste.Naziv = azuriranoSkladiste.Naziv;
            skladiste.Adresa = azuriranoSkladiste.Adresa;
            skladiste.Kapacitet = azuriranoSkladiste.Kapacitet;

            await skladistaDbContext.SaveChangesAsync();
            return Ok();

        }

        [HttpDelete]

        public async Task<IActionResult> ObrisiSkladiste([FromBody] Skladiste obrisanoSkladiste)
        {
            var skladiste = await skladistaDbContext.Skladista.FindAsync(obrisanoSkladiste.ID);
            if (skladiste == null)
            {
                return NotFound();
            }
            skladistaDbContext.Skladista.Remove(skladiste);
            await skladistaDbContext.SaveChangesAsync();
            return Ok();
        }
    }
}
