using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.AspNetCore.Mvc.ViewFeatures;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.AspNetCore.Hosting;
using SendGrid;
using SendGrid.Helpers.Mail;
using PortableRecipes;
using PortableRecipes.Models;
using PortableRecipes.Filters;


[Route("/[controller]")]
  public class CategoriesController : Controller
  {
    private readonly MailOptions _mailOptions;
    public readonly PortableRecipesContext _context;
    public IHostingEnvironment env;

    public CategoriesController(PortableRecipesContext context, IHostingEnvironment env, IOptions<MailOptions> mailOptionsAccessor)
    {
      _context = context;
      _mailOptions = mailOptionsAccessor.Value;
      this.env = env;
    }

    [RestrictToUserType(new string[] {"*"})]
    [HttpGet("{id}")]
    public IActionResult View(int id)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var current_Admin = session == null ? null : session.Admin;
      
      ViewData["CurrentUser"] = session == null ? null : session.User;
      ViewData["CurrentAdmin"] = session == null ? null : session.Admin;
      ViewData["id"] = id;
      ViewData["Page"] = "Categories/View";
      return View();
    }
  }

  