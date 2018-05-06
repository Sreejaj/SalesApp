import { Component, OnInit } from '@angular/core';
import { payments, DataService } from '../services/data.service';

@Component({
  selector: 'payment-details',
  templateUrl: './paymentdetails.component.html',
  styleUrls: ['./paymentdetails.component.css']
})
export class PaymentdetailsComponent implements OnInit {

  public payments: payments[];  
  constructor( private paymentdataservice:DataService ) { }

  ngOnInit() {
    this.payments=this.paymentdataservice.getMessage();    
  }

}
