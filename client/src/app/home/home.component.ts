import { Component, OnInit } from '@angular/core';
import { AuthenticationService, User } from '../services/authentication.service';
import { DataService, Customer } from '../services/data.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public customer: Customer;
	public saveEnable = false;
	public user: User;
  public username:string="";
  constructor(private dataservice: DataService, private authservice: AuthenticationService)
	{
		this.user = authservice.user;
	}

  ngOnInit() {
    this.dataservice.setOperatorDetails(this.username, this.user.location);
		this.customer = this.dataservice.getCustomer();
  }
  saveDetail() {
    if(this.dataservice.cansave)
    {
    var result=this.dataservice.save();
        if(result)
        {
          alert("saved successfully");
          this.dataservice.cleardata();
        }
        else
        {
          alert("can not save data, please retry");
        }
    }
    else
    {
      alert("Please provide all relevent information")
    }
	}
}
