using Microsoft.Extensions.Configuration;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Sales.Controllers;
using Sales.Data;
using Sales.Model;
using System.IO;
using System.Reflection;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;

namespace Sales.Test
{
    [TestClass]
    public class SalesControllerTest
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
        public void UpdateSales()
        {

            var _controller = new SalesController(_context);
            var _payments = new List<Payments>();
            _payments.Add(new Payments() { Amount = 12222.55f, Description = "Test", Paymentdate = DateTime.Now, RecNo = 1 });
            _payments.Add(new Payments() { Amount = 33333.55f, Description = "Test2", Paymentdate = DateTime.Now, RecNo = 2 });
            SalesData _data = new SalesData()
            {
                CustomerId = "1",
                Currency = "AED",
                LocationName = "Sydney",
                openingdebt = 12456.23f,
                OperatorName = "test",
                SalesInvoiceNumber = "12345-1234",
                Timestamp = DateTime.Now,
                Payments = _payments
            };
            var _response = _controller.Update(_data);

            Assert.IsTrue(_response, "Issue with update");
            
        }
    }
}
