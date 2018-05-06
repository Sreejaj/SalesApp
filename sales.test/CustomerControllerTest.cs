using Microsoft.Extensions.Configuration;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Sales.Controllers;
using Sales.Data;
using Sales.Model;
using System.IO;
using System.Reflection;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;

namespace Sales.Test
{
    [TestClass]
    public class CustomerControllerTest
    {
        private IConfiguration _config;
        private SalesDbContext _context;
        [TestInitialize]
        public void init()
        {
            var configRoot = new ConfigurationBuilder()
               .SetBasePath(Directory.GetCurrentDirectory())
               .AddJsonFile("appsettings.json", true, true);

            _config = configRoot.Build();

            DbContextOptionsBuilder<SalesDbContext> _builder = new DbContextOptionsBuilder<SalesDbContext>();
            _builder = _builder.UseSqlServer(_config.GetConnectionString("dbconnection"));
            _context = new SalesDbContext(_builder.Options);
        }
        [TestMethod]
        public void GetAllCustomers()
        {
           
            var _controller = new CustomerController(_context);
            var _response = _controller.All();

            Assert.IsNotNull(_response, "Issue with customer");
            var _result = new JsonResult(_response);
            Assert.IsInstanceOfType(_response, _result.GetType());
        }

    }

    public class customer
    {
        public string CustomerId { get; set; }
        public string CustomerName { get; set; }
        
    }
}
