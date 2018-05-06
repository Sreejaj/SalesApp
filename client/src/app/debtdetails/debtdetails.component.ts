import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'debt-details',
  templateUrl: './debtdetails.component.html',
  styleUrls: ['./debtdetails.component.css']
})
export class DebtdetailsComponent implements OnInit {

  constructor(private dataservice:DataService) { }
  public openingDebt:number;
  public currency:string="";
  public invoiceNo:string="";
    ngOnInit() {
    }
    onChange()
    {
      this.dataservice.setCommonInfo(this.openingDebt,this.currency,this.invoiceNo);
      console.log('changed')
    }

}
