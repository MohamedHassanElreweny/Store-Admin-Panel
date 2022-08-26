import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private _AuthService:AuthService , private _Router:Router) { }

  errorMessage:string='';
  loginForm:FormGroup=new FormGroup({
    'username':new FormControl(null , [Validators.required]),
    'password':new FormControl(null , [Validators.required]),
  })

  ngOnInit(): void {

  }

  login(data:FormGroup){
    if(this.loginForm.invalid) return;
      this._AuthService.login(data.value).subscribe({
        next:(response)=>{
          if(response!=null){
            console.log(response);
            localStorage.setItem('userToken',response.token);
            this._AuthService.GetUserDate();
            this._Router.navigate(['/dashboard']);
          }
        },
        error:()=>{
          this.errorMessage="user name or password is not correct";
        }
      })
  }
}
