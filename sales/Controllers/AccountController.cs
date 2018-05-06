using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Sales.Data;
using Sales.Model;

namespace Sales.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [AllowAnonymous]
    public class AccountController : Controller
    {
        private IConfiguration _config;
        private SalesDbContext _dbContext;

        public AccountController(IConfiguration config, SalesDbContext context)
        {
            _config = config;
            _dbContext = context;
        }

        [HttpPost("[action]")]
        public IActionResult Authenticate([FromBody] Login login)
        {
            if(!ModelState.IsValid)
            {
                return new JsonResult(BadRequest());
            }
            var _user = AuthenticateUser(login);
            if (_user != null)
            {
                var _token = BuildToken(_user);

                return new JsonResult(Ok(new { token = _token,
                    expiredon = DateTime.Now.AddMinutes(30),
                    location =_user.Location,
                    fullName =_user.FullName }));

            }
            else
            {
                return new JsonResult(Unauthorized());
            }
        }
        private string BuildToken(Operators user)
        {
            var _key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var _creds = new SigningCredentials(_key, SecurityAlgorithms.HmacSha256);
            var _claims = new[] {
                        new Claim(JwtRegisteredClaimNames.Sub, user.UserName),
                        new Claim(JwtRegisteredClaimNames.Email, user.Email) ,
                        new Claim(JwtRegisteredClaimNames.GivenName, user.FullName)};


            var _token = new JwtSecurityToken(_config["Jwt:Issuer"],
                  _config["Jwt:Issuer"],
                  claims: _claims,
                  expires: DateTime.Now.AddMinutes(30),
                  signingCredentials: _creds);

            return new JwtSecurityTokenHandler().WriteToken(_token);
        }
        private Operators AuthenticateUser(Login login)
        {
            var _user = _dbContext.Operator.Where(user => user.OperatorId == login.UserName &&
                                    user.OperatorPassword == login.Password && user.Active == true).FirstOrDefault();

            if (_user != null)
            {

                var _operator = new Operators() { UserName = login.UserName,
                                                FullName = _user.FullName,
                                                Location=_user.WorkLocation,
                                                Email = _user.Email };
                return _operator;
            }
            return null;
        }
    }
}