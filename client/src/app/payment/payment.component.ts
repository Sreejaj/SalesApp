import { Component, OnInit } from '@angular/core';
import { payments, DataService } from '../services/data.service';

@Component({
  selector: 'payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  constructor(private paymentdataservice:DataService)  { }
  public description :string ="";
  public amount : number;
 
  ngOnInit() {
  }
  addItem()
  {
    var payment:payments=new payments();
    payment.amount=this.amount;
    payment.description=this.description;
    payment.paymentdate=new Date().getUTCDate();
    payment.recno=this.paymentdataservice.getCustomer().payments.length+1;
    this.paymentdataservice.addMessage(payment);
    this.description='';
    this.amount=0;
  }

}
