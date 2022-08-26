import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl="https://localhost:7296/api/Admin";

  url="https://localhost:7296/api/Admin";

  currentUser= new BehaviorSubject(null);
  constructor(private _HttpClient:HttpClient , private _Router:Router) {
    if(localStorage.getItem('userToken')){
      this.GetUserDate();
    }
   }

  Register(data:any):Observable<any>{
    return this._HttpClient.post(this.baseUrl+"/register",data);
  }

  login(data:object):Observable<any>{
    return this._HttpClient.post(this.baseUrl,data);
  }

  GetUserDate(){
    let data:any =localStorage.getItem('userToken');
    let decoded:any = jwtDecode(data);
    this.currentUser.next(decoded);
  }

  logout(){
    localStorage.removeItem('userToken');
    this.currentUser.next(null);
    this._Router.navigate(['/login']);
  }
  
}
