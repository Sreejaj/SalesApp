using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Sales.Model
{
    public class Payments
    {
        [Required]
        public string Description { get; set; }
        [Required]
        public short RecNo { get; set; }
        [Required]
        public float Amount { get; set; }
        [Required]
        public DateTime Paymentdate { get; set; }
    }
}
