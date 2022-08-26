import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();

  islogin:boolean=false;
  UserName:any;
  constructor(private _AuthService:AuthService) {}

  ngOnInit(): void {
    this._AuthService.currentUser.subscribe({
      next:()=>{
        if(this._AuthService.currentUser.getValue() != null){
          this.islogin=true
        }
        else
          this.islogin=false;
      }
    })
    this.UserName = this._AuthService.currentUser.getValue()?.['UserName'];
  }

  toggleSidebar() {
    this.toggleSidebarForMe.emit();
  }



  logout(){
    this._AuthService.logout();
  }
}
