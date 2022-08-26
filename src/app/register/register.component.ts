import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  errorMessage:string='';

  constructor(private _AuthService:AuthService , private _Router:Router) { }

  gender:any[]=[{key:0,value:'Male'},{key:1,value:'female'}];

  registerForm:FormGroup=new FormGroup({
    'firstName':new FormControl(null,[Validators.required,Validators.pattern(/^[a-zA-Z]{2,30}$/)]),
    'lastName':new FormControl(null,[Validators.required,Validators.pattern(/^[a-zA-Z]{2,30}$/)]),
    'username':new FormControl(null,[Validators.required,Validators.pattern(/^[a-zA-Z]{2,30}$/)]),
    'email':new FormControl(null,[Validators.required,Validators.email]),
    'birthDay':new FormControl(null,Validators.required),
    'gender':new FormControl(null,Validators.required),
    'phone':new FormControl(null,[Validators.required,Validators.pattern(/^(002)?01[0125][0-9]{8}$/)]),
    'city':new FormControl(null,[Validators.required,Validators.pattern(/^[a-zA-Z]{2,30}$/)]),
    'street':new FormControl(null,[Validators.required,Validators.pattern(/^[a-zA-Z]{2,30}$/)]),
    'stateOrProvince':new FormControl(null,[Validators.required,Validators.pattern(/^[a-zA-Z]{2,30}$/)]),
    'country':new FormControl(null,[Validators.required,Validators.pattern(/^[a-zA-Z]{2,30}$/)]),
    'password':new FormControl(null,[Validators.required , Validators.pattern(/m/)]),
  })

  // ^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,10}$

  ngOnInit(): void {
  }

  register(data:FormGroup){
    if(this.registerForm.invalid) return;
    let obj={
      'firstName':data.value.firstName,
      'lastName':data.value.lastName,
      'username':data.value.username,
      'email':data.value.email,
      'birthDay':data.value.birthDay,
      'gender':data.value.gender,
      'phone':data.value.phone,
      "address": {
        "city": data.value.city,
        "street": data.value.street,
        "stateOrProvince": data.value.stateOrProvince,
        "country": data.value.country
      },
      'password':data.value.password,
    }
    this._AuthService.Register(obj).subscribe({
      next:(data)=>{
          if(data.message == 'success'){
            this._Router.navigate(['/login']);
          }
          else{
            this.errorMessage="User is Aready registered";
          }
      }
    })
  }
}
