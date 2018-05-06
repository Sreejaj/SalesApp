import { Component, Inject } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { User, AuthenticationService } from '../services/authentication.service';

@Component({
    selector: 'login',
    templateUrl: 'login.component.html',
    styleUrls: [ 'login.component.css']
})
export class LoginComponent {
	public username: string = "";
	public password: string = "";
	public baseURL: string = "";

	//private name = 'LoginComponent';

	constructor(private authservice:AuthenticationService, private router: Router,private http: HttpClient, @Inject('BASE_URL') baseurl: string)
	{
		this.baseURL = baseurl;
	}
	login()
	{		
		 var error:string =this.authservice.login(this.username,this.password);
		 
	}
}



