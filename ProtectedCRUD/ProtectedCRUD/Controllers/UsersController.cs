using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ProtectedCRUD.context;
using ProtectedCRUD.Models;


namespace ProtectedCRUD.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly context.AppContext context;

        public UsersController(context.AppContext _context)
        {
            context = _context;
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            User user = await context.user.FindAsync(id);


            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        [HttpPost("login")]
        public ActionResult<User> Login(User userSearch)
        {
           
            User userIdentificated = context.user.Where(user => user.email.Equals(userSearch.email) && user.password.Equals(userSearch.password)).FirstOrDefault();

            if (userIdentificated == null)
            {
                return NotFound();
            }

            return userIdentificated;
        }

        [HttpPost]
        public async Task<ActionResult<User>> PostUser(User user)
        {
            context.user.Add(user);
            await context.SaveChangesAsync();

            return CreatedAtAction("GetUser", new { id = user.id }, user);
        }
    }
}
