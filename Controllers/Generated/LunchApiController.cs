using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.AspNetCore.Mvc.ViewFeatures;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using SendGrid;
using SendGrid.Helpers.Mail;
using PortableRecipes;
using PortableRecipes.Models;
using PortableRecipes.Filters;
using System.IO;


  [Route("api/v1/Lunch")]
  public class LunchApiController : Controller
  {
    private readonly MailOptions _mailOptions;
    public readonly PortableRecipesContext _context;
    private IHostingEnvironment env;

    public LunchApiController(PortableRecipesContext context, IHostingEnvironment env, IOptions<MailOptions> mailOptionsAccessor)
    {
      _context = context;
      _mailOptions = mailOptionsAccessor.Value;
      this.env = env;
    }

    public bool ApiTokenValid => RestrictToUserTypeAttribute.ApiToken != null &&
        HttpContext.Request.Headers["ApiToken"] == RestrictToUserTypeAttribute.ApiToken;

    
    [RestrictToUserType(new string[] {"User", "Admin"})]
    [HttpGet("{id}")]
    [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult /*ItemWithEditable<Lunch>*/ GetById(int id)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var current_Admin = session == null ? null : session.Admin;
      var allowed_items = ApiTokenValid ? _context.Lunch : _context.Lunch;
      var editable_items = ApiTokenValid ? _context.Lunch : current_Admin != null ? _context.Lunch : Enumerable.Empty<Lunch>().AsQueryable();
      var item_full = allowed_items.FirstOrDefault(e => e.Id == id);
      if (item_full == null) return NotFound();
      var item = PortableRecipes.Models.Lunch.FilterViewableAttributesLocal(current_User, current_Admin)(item_full);
      item = PortableRecipes.Models.Lunch.WithoutImages(item);
      return Ok(new ItemWithEditable<Lunch>() {
        Item = item,
        Editable = editable_items.Any(e => e.Id == item.Id) });
    }
    

    [RestrictToUserType(new string[] {"Admin"})]
    [HttpPost]
    [ValidateAntiForgeryToken]
    public IActionResult /*Lunch*/ Create()
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var current_Admin = session == null ? null : session.Admin;
      var can_create_by_token = ApiTokenValid || true;
      if (!can_create_by_token)
        return Unauthorized();
        // throw new Exception("Unauthorized create attempt");
      var item = new Lunch() { CreatedDate = DateTime.Now, Id = _context.Meal.Max(i => i.Id) + 1 };
      _context.Lunch.Add(PortableRecipes.Models.Lunch.FilterViewableAttributesLocal(current_User, current_Admin)(item));
      _context.SaveChanges();
      item = PortableRecipes.Models.Lunch.WithoutImages(item);
      return Ok(item);
    }

    [RestrictToUserType(new string[] {"Admin"})]
    [HttpPut]
    [ValidateAntiForgeryToken]
    public IActionResult Update([FromBody] Lunch item)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var current_Admin = session == null ? null : session.Admin;
      var allowed_items = ApiTokenValid ? _context.Lunch : _context.Lunch;
      if (!allowed_items.Any(i => i.Id == item.Id)) return Unauthorized();
      var new_item = item;
      
      var can_edit_by_token = ApiTokenValid || true;
      if (item == null || !can_edit_by_token)
        return Unauthorized();
        // throw new Exception("Unauthorized edit attempt");
      _context.Update(new_item);
      _context.Entry(new_item).Property(x => x.CreatedDate).IsModified = false;
      _context.SaveChanges();
      return Ok();
    }

    [RestrictToUserType(new string[] {"Admin"})]
    [HttpDelete("{id}")]
    [ValidateAntiForgeryToken]
    public IActionResult Delete(int id)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var current_Admin = session == null ? null : session.Admin;
      var allowed_items = ApiTokenValid ? _context.Lunch : _context.Lunch;
      var item = _context.Lunch.FirstOrDefault(e => e.Id == id);
      var can_delete_by_token = ApiTokenValid || true;
      if (item == null || !can_delete_by_token)
        return Unauthorized();
        // throw new Exception("Unauthorized delete attempt");
      
      if (!allowed_items.Any(a => a.Id == item.Id)) return Unauthorized(); // throw new Exception("Unauthorized delete attempt");
      
      

      _context.Lunch.Remove(item);
      _context.SaveChanges();
      return Ok();
    }


    [RestrictToUserType(new string[] {"User", "Admin"})]
    [HttpGet]
    [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
    public Page<Lunch> GetAll([FromQuery] int page_index, [FromQuery] int page_size = 25 )
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var current_Admin = session == null ? null : session.Admin;
      var allowed_items = ApiTokenValid ? _context.Lunch : _context.Lunch;
      var editable_items = ApiTokenValid ? _context.Lunch : current_Admin != null ? _context.Lunch : Enumerable.Empty<Lunch>().AsQueryable();
      var can_edit_by_token = ApiTokenValid || true;
      var can_create_by_token = ApiTokenValid || true;
      var can_delete_by_token = ApiTokenValid || true;
      var items = allowed_items.OrderBy(i => i.CreatedDate).AsQueryable();
      
      return items
        .Select(PortableRecipes.Models.Lunch.FilterViewableAttributes(current_User, current_Admin))
        .Select(s => Tuple.Create(s, can_edit_by_token && editable_items.Any(es => es.Id == s.Id)))
        .Paginate(can_create_by_token, can_delete_by_token, false, page_index, page_size, PortableRecipes.Models.Lunch.WithoutImages, item => item , null );
    }

    


    
  }

  