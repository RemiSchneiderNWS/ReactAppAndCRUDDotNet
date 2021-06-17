using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ProtectedCRUD.context;
using ProtectedCRUD.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using Microsoft.IdentityModel.Tokens;
using System.Text;

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

            var roles = new List<Claim>();
            roles.Add(new Claim(ClaimTypes.Role, "Admin"));

            string SECRET_KEY = "chaineDeTexte2Trente2Caracteres";

            var SIGNING_KEY = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(SECRET_KEY));
            var signingCredentials = new SigningCredentials(SIGNING_KEY, SecurityAlgorithms.HmacSha256);

            var token =  new JwtSecurityToken(
                issuer: "Admin",
                audience: "readers",
                claims: roles,
                expires: DateTime.Now.AddMinutes(20),
                signingCredentials: signingCredentials);
            //HttpContext.Session.SetString("UserMail", userIdentificated.email);

            //return Ok(new JwtSecurityTokenHandler().WriteToken(token));
            return userIdentificated;
        }

        [HttpGet("userlist")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<IEnumerable<User>>> Getuser()
        {
            return await context.user.ToListAsync();
        }

        [HttpGet("setsession")]
        public ActionResult<string> set()
        {

            
            HttpContext.Session.SetString("UserMail", "user120");

            return "set";
        }

        [HttpPost]
        public async Task<ActionResult<User>> PostUser(User user)
        {
            context.user.Add(user);
           

            await context.SaveChangesAsync();

            return CreatedAtAction("GetUser", new { id = user.id }, user);
        }

        [HttpGet("Userconnected")]
        public ActionResult<string> GetUserConnected()
        {
            string mail = HttpContext.Session.GetString("UserMail");
            if(mail == null)
            {
                return "Aucun utilisateur connecté";
            }
            return mail;
        }
    }
}
