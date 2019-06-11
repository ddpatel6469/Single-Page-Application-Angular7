import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject,BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  $authStatus = new BehaviorSubject(this.checkUserStatus());

  constructor(private _router : Router, private _http : HttpClient) { }

  login(credentials){
    this._http.post("http://localhost:3000/authenticate",credentials)
    .subscribe((data:any) => {
      if(data.isLoggedIn){
      localStorage.setItem("token",data.token);
      this.$authStatus.next(this.checkUserStatus());
      this._router.navigate(['/welcome']);
      }
      else{
        alert("Invalid credentials");
      }
    });
    // if(credentials.username=="admin" && credentials.password=="admin"){
    //   localStorage.setItem("isLoggedIn","true");
    //   this.$authStatus.next(this.checkUserStatus());
    //   this._router.navigate(['/welcome']);
    // } else{
    //   alert("Invalid Credentials");
    // }
  }

  logout(){
    localStorage.removeItem("token");
    this.$authStatus.next(this.checkUserStatus());
    this._router.navigate(['/login']);
  }

  checkUserStatus(){
    return localStorage.getItem("token");
  }

}
