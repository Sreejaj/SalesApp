using System;
using System.Collections.Generic;

namespace Sales.Data
{
    public partial class Payment
    {
        public int PaymentId { get; set; }
        public string CustomerId { get; set; }
        public string OperatorId { get; set; }
        public double OpeningDebt { get; set; }
        public string Currency { get; set; }
        public string InvoiceNumber { get; set; }
    }
}
