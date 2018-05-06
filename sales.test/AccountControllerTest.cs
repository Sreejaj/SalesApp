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
    public class AccountControllerTest
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
        public void EmptyUserNameandpassword()
        {
            var _login = new Login() { UserName="",Password=""};
            var _controller = new AccountController(_config,_context);
            var _response=_controller.Authenticate(_login);
          
            Assert.IsNotNull(_response, "Issue with authentication");
            var _result = new JsonResult(new UnauthorizedResult());
            Assert.IsInstanceOfType(_response, _result.GetType());
        }

        [TestMethod]
        public void InvaliidUserNameandpassword()
        {
            var _login = new Login() { UserName = "test", Password = "tttt" };
            var _controller = new AccountController(_config, _context);
            var _response = _controller.Authenticate(_login);

            Assert.IsNotNull(_response, "Issue with authentication");
            var _result = new JsonResult(new UnauthorizedResult());
            Assert.IsInstanceOfType(_response, _result.GetType());
        }

        [TestMethod]
        public void ValidUserNameandpassword()
        {
            var _login = new Login() { UserName = "test", Password = "test" };
            var _controller = new AccountController(_config, _context);
            var _response = _controller.Authenticate(_login);

            Assert.IsNotNull(_response, "Issue with authentication");
            var _result = new JsonResult(new OkResult());
            Assert.IsInstanceOfType(_response, _result.GetType());
        }
    }
}
