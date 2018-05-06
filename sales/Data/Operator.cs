using System;
using System.Collections.Generic;

namespace Sales.Data
{
    public partial class Operator
    {
        public string OperatorId { get; set; }
        public string OperatorPassword { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string WorkLocation { get; set; }
        public bool? Active { get; set; }
    }
}
