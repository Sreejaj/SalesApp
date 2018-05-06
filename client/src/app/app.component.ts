import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  constructor(private router: Router, private authenticate: AuthenticationService) {
    if(location.pathname=="/login")
    {
      //authenticate.logout();
    }		
		if (!authenticate.isloggedin() && location.pathname != "/" && location.pathname != '/login') {     
			router.navigateByUrl( "/login");
		}
  }
}
