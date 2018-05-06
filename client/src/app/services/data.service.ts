import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DataService {

        private allCustomers: Customer[]=new Array();
        private customer: Customer = new Customer();
        private url: string;
        constructor(private http: HttpClient, @Inject('BASE_URL') baseurl: string) {
          this.url = baseurl;

          var response;
                    
          this.http.get<Customer[]>(this.url + 'api/customer/All')
            .subscribe(result => {				
              console.log(result);
              this.allCustomers = result;
            }, error => console.error(error))
        }

        addMessage(message: payments) {
            this.customer.payments.push(message)
        }
        getMessage() {
            return this.customer.payments;
        }
        getAllCustomers() {
            return this.allCustomers;
        }
        getCustomer() {
            return this.customer;
        }
        setCustomerId(id: string) {
            this.customer.customerid = id;
        }
        setCommonInfo(openingdebt: number, currency: string, invoicenumber: string) {
            this.customer.openingdebt = openingdebt;
            this.customer.currency = currency;
            this.customer.saleinvoiceNumber = invoicenumber;
            var date: Date = new Date();
            this.customer.timestamp = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
        }
        setcustomerId(customerid: string) {
            this.customer.customerid = customerid;
        }
        setOperatorDetails(operator: string, location: string) {
            this.customer.operatorname = operator;
            this.customer.locationname = location;
        }
        cansave() {
          if (this.customer.payments.length > 0 && this.customer.openingdebt > 0 && this.customer.currency.trim().length > 0
            && this.customer.saleinvoiceNumber.trim().length > 0 && this.customer.customerid.trim().length > 0 &&
            this.customer.operatorname.trim().length > 0
          ) {
            return true;
          }
          else {
              alert("Please make sure necessary data is provided");
            return false;
          }
        }
        save()
        {
            this.http.post<boolean>(this.url + 'api/Sales/Update',
                { "salesInfo":JSON.stringify( this.customer) })

                .subscribe(result  => {    
                    return result;
                }, error => console.error(error))
        }
        cleardata()
        {
            this.customer= new Customer();
        }

}
export class payments {
    public description: string;
    public recno:number;
	public amount: number;
	public paymentdate;
}

export class Customer {
	public id: string;
	public name: string;
	public customerid: string;
	public timestamp: Date;
	public locationname: string;
	public operatorname: string;
	public payments: payments[] = new Array();
	public openingdebt: number;
	public currency: string;
	public saleinvoiceNumber: string;
	
	constructor(customerid: string ="", customername: string ="")
	{
		this.customerid = customerid;
		this.name = customername;
	}
}