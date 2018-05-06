import { Component, OnInit } from '@angular/core';
import { DataService, Customer } from '../services/data.service';

@Component({
  selector: 'customer-search',
  templateUrl: './customersearch.component.html',
  styleUrls: ['./customersearch.component.css']
})
export class CustomersearchComponent implements OnInit {
  public name = '';  
  public id='';
  public flag: boolean = true;  
  private allcustomers: Customer[];
  public searchedCustomers: Customer[];

  constructor(private dataService: DataService) 
  { 
    this.allcustomers = dataService.getAllCustomers();
	  this.searchedCustomers = this.allcustomers;
  }

  ngOnInit() {
  }

  searchCustomer(term:string):void
  {
      this.flag=true;
      this.searchedCustomers = this.allcustomers.filter(customer => customer.name.indexOf(term) != -1);
      console.log(this.flag);
      console.log(term);
  }

  selectedCustomer(selectedcustomer)
  {
    if(selectedcustomer!=0)
    {
      //this.name=selectedcustomer.name;
      this.id=selectedcustomer;
      //this.flag=false;
	    this.dataService.setcustomerId(this.id);
    } 
    else
    {
      return false;
    }
  }
}
