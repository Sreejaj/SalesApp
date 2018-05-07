using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Sales.Data;
using Sales.Model;

namespace Sales.Controllers
{
    [Produces("application/json")]
    [Route("api/Sales")]
    [Authorize]
    public class SalesController : Controller
    {
        private readonly SalesDbContext _dbContext;
        public SalesController(SalesDbContext context)
        {
            _dbContext = context;
        }

        [HttpPost("[action]")] 
        public bool Update([FromBody] Model.SalesData salesInfo)
        {
            if(!ModelState.IsValid)
            {
                return false;
            }
            bool _result = true;
            //Add records to payment table first
            _dbContext.Payment.Add(
                new Payment()
                {
                    CustomerId = salesInfo.CustomerId,
                    InvoiceNumber = salesInfo.SalesInvoiceNumber,
                    OpeningDebt=salesInfo.openingdebt,
                    Currency=salesInfo.Currency,
                    OperatorId=salesInfo.OperatorName
                }
                );
            _dbContext.SaveChanges();
            //get the Id
            int _id=_dbContext.Payment.FirstOrDefault(x => 
                                    x.InvoiceNumber == salesInfo.SalesInvoiceNumber
                                    && x.CustomerId==salesInfo.CustomerId
                                    && x.OperatorId==salesInfo.OperatorName
                                    ).PaymentId;
            //Add records to payment details table
            foreach(var _payment in salesInfo.Payments )
            {
                _dbContext.PaymentDetails.Add(
                    new PaymentDetails()
                    {
                        PaymentId = _id,
                        RecNo = _payment.RecNo,
                        PaymentTime = _payment.Paymentdate,
                        Description = _payment.Description,
                        Amount = _payment.Amount
                    }
                    );
            }
            return _result;
        }
    }
}