import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  constructor(private _AuthService:AuthService) { }

  isLogin:boolean=false;
  ngOnInit(): void {
    this._AuthService.currentUser.subscribe({
      next:()=>{
        if(this._AuthService.currentUser.getValue() != null){
          this.isLogin=true;
        }
        else
          this.isLogin=false;
      }
    })
  }

}
