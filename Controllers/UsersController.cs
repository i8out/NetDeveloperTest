using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NetDeveloperTest.Interfaces;
using NetDeveloperTest.Models;
using NetDeveloperTest.Services;

namespace NetDeveloperTest.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly User_ProjectContext _context;
        private readonly IUserService _userService;
        private readonly IEmailSender _emailSender;

        public UsersController(
            User_ProjectContext context,
            IUserService userService,
            IEmailSender emailSender
            )
        {
            _context = context;
            _userService = userService;
            _emailSender = emailSender;
        }

        // GET: api/Users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUser()
        {

            return Ok(await _userService.GetAll());
        }

        // GET: api/Users/5
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(Guid id)
        {
            var user = await _context.User.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        // PUT: api/Users/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(Guid id, User user)
        {
            if (id != user.Id)
            {
                return BadRequest();
            }

            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Users
        [HttpPost]
        public async Task<ActionResult<User>> PostUser(User user)
        {
            if (user.Id == Guid.Parse("00000000-0000-0000-0000-000000000000"))
            {
                try
                {
                    await _userService.Add(user);
                    var message = new Message(new string[] { "free.nebula@outlook.com" }, "Welcome email", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.");
                    _emailSender.SendEmail(message);
                } 
                catch
                {
                    throw;
                }

            }
            else
            {
                var userData = _userService.GetById(user.Id);
                user.FirstName = user.FirstName ?? userData.FirstName;
                user.LastName = user.LastName ?? userData.LastName;
                user.Password = user.Password ?? userData.Password;

                await _userService.Update(user);
            }

            //return CreatedAtAction("GetUser", new { id = user.Id }, user);
            return Ok(user);
        }

        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<User>> DeleteUser(Guid id)
        {
            var user = await _context.User.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.User.Remove(user);
            await _context.SaveChangesAsync();

            return user;
        }

        private bool UserExists(Guid id)
        {
            return _context.User.Any(e => e.Id == id);
        }
    }
}
