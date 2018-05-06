using System;
using System.Collections.Generic;

namespace Sales.Data
{
    public partial class Customer
    {
        public string CustomerId { get; set; }
        public string CustomerName { get; set; }
        public string Address { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public bool? Active { get; set; }
    }
}
