using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProtectedCRUD.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProtectedCRUD.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MaterialController : Controller
    {

        private readonly context.AppContext context;

        public MaterialController(context.AppContext _context)
        {
            context = _context;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<matérial>>> GetMaterial()
        {
           
            return await context.material.ToListAsync();
        }

        [HttpPost("newMaterial")]
        public async Task<ActionResult<matérial>> PostMaterial(matérial material)
        {
            context.material.Add(material);
            await context.SaveChangesAsync();

            return material;
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<string>> DeleteMaterial(int id)
        {
            matérial material = await context.material.FindAsync(id);

            if (material == null)
            {
                return NotFound();
            }

            context.material.Remove(material);
            await context.SaveChangesAsync();



            return NoContent();
        }

        [HttpPut("update/{newName}")]
        public async Task<IActionResult> PutNameMaterial(NameSetter newName)
        {
            matérial material = await context.material.FindAsync(newName.id);
            if (material == null)
            {
                throw new ArgumentException("material not found");
            }

            material.name = newName.name;

            context.Entry(material).State = EntityState.Modified;

            await context.SaveChangesAsync();         

            return NoContent();
        }
    }
}
