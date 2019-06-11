import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  userStatus : boolean = false;

  constructor(private _authService : AuthService) { }

  ngOnInit() {
    //this.userStatus = JSON.parse(this._authService.checkUserStatus());
    this._authService.$authStatus.subscribe((data:any) => {
      this.userStatus = data;
    });
  }

  logout(){
    this._authService.logout();
  }

}
