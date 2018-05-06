using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Sales.Model
{
    public class SalesData
    {
        public string Id { get; set; }        
        public string Name { get; set; }
        [Required]
        public string CustomerId { get; set; }
        [Required]
        public DateTime Timestamp { get; set; }        
        public string LocationName { get; set; }
        [Required]
        public string OperatorName { get; set; }
        [Required]
        public float openingdebt { get; set; }
        [Required]
        public string Currency { get; set; }
        [Required]
        public string SalesInvoiceNumber { get; set; }
        [Required]
        public List<Payments> Payments { get; set; }
    }
}
