using System;
using System.Collections.Generic;

namespace Sales.Data
{
    public partial class PaymentDetails
    {
        public int PaymentId { get; set; }
        public short RecNo { get; set; }
        public DateTime PaymentTime { get; set; }
        public string Description { get; set; }
        public double Amount { get; set; }
    }
}
