using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Sales.Data;

namespace Sales.Controllers
{    
    [Route("api/[controller]")]
    [Authorize]
    //[EnableCors("CorsPolicy")]
    public class CustomerController : Controller
    {

        private readonly SalesDbContext _dbContext;
        public CustomerController(SalesDbContext context)
        {
            _dbContext = context;
        }
        [HttpGet("[action]")]
        public IActionResult All()
        {
            var _customers = _dbContext.Customer.Select(cust=> new {cust.CustomerId,cust.CustomerName })                                       
                                        .ToList();
            return new JsonResult(Ok(new {customer= _customers }));
        }
    }
}