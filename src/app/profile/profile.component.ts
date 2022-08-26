import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private _auth:AuthService) { }

  fname:any;
  lname:any;
  Email:any;
  Address:any;
  Country:any;
  Gender:any;
  ID:any;
  Street:any;
  Phone:any;
  UserName:any;
  ngOnInit(): void {
    this.fname =this._auth.currentUser.getValue()?.['Firstname'];
    this.lname = this._auth.currentUser.getValue()?.['LastName'];
    this.Email =this._auth.currentUser.getValue()?.['Email'];
    this.Address = this._auth.currentUser.getValue()?.['Address'];
    this.Country =this._auth.currentUser.getValue()?.['Country'];
    this.ID = this._auth.currentUser.getValue()?.['ID'];
    this.Street =this._auth.currentUser.getValue()?.['Street'];
    this.Phone =this._auth.currentUser.getValue()?.['PhoneNumber'];
    this.UserName =this._auth.currentUser.getValue()?.['UserName'];
  }

}
