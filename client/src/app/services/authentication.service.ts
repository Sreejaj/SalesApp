import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

@Injectable()
export class AuthenticationService {

  public url: string = '';
	public user: User ;
	constructor( private router: Router,private http: HttpClient, @Inject('BASE_URL') baseurl: string) {
		this.url = baseurl;
  } 
  ///Login and set token if valid
	login(username:string, password:string)
	{
      var response;
      this.http.post<AuthResponse>(this.url + 'api/Account/Authenticate',
        { "UserName": username, "Password": password })

        .subscribe(result  => {          				
         
          if (result.statusCode == "200") {
						//store token if successfully login
						localStorage.setItem("token", result.value.token);
						localStorage.setItem("tokenexpire",Date.parse(result.value.expiredon.toString()).toString());
						console.log(result);
            this.user=result.value;          
            this.router.navigateByUrl('/home');
            response="";
          }
          else
          {             
					 alert("Invallid username and/or password");
					 //remove token if not successfull
					 localStorage.removeItem("token");
					 localStorage.removeItem("tokenexpire");
          }
        }, error => alert(error));
        return response;
	}
	//logout user
	logout() {
		localStorage.removeItem("token");
		localStorage.removeItem("tokenexpire");
		location.pathname = '/login';
	}
	//check is logged in
	isloggedin() {
		if (localStorage.getItem("token") ) {
			var tokenexpire=localStorage.getItem("tokenexpire");
			if( Date.parse(tokenexpire)>Date.now())
			{
				return true;
			}
			else{return false;}
		}
		else 
		{
			return false;
		}
	}
}

//Class for user
export class User
{
  public token :string;
  public expiredon:Date;
  public location : string;
  public fullName : string;
}
//Class for stroring Authorization response
export class AuthResponse
{
  public statusCode :string;
  public value  : User
}

//Authentication interceprion 
// Will log off the user if not logged in /token expired
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

	intercept(req: HttpRequest<any>,
		next: HttpHandler): Observable<HttpEvent<any>> {
			var token ;
			var tokenexpire;
			if(!(location.pathname=="/login" || location.pathname=='/'))
			{
				token=localStorage.getItem("token");
				tokenexpire=localStorage.getItem("tokenexpire");
			}
	
			
		if (token && tokenexpire && Date.parse(tokenexpire)>Date.now()) {
			//Create a request header with autheization token
			const cloned = req.clone({
				headers: req.headers.set("Authorization",
					"Bearer " + token).set("Access-Control-Allow-Origin","*")
			});

			return next.handle(cloned);
		}
		else {
			return next.handle(req);
		}
	}
}
