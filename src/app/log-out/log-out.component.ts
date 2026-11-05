import { Component, inject } from '@angular/core';
import {ActivatedRoute,Router} from '@angular/router';
@Component({
  selector: 'app-log-out',
  imports: [],
  templateUrl: './log-out.component.html',
  styleUrl: './log-out.component.css'
})
export class LogOutComponent {
   route = inject(ActivatedRoute);
   router = inject(Router);
   queryParams:{username?:string}={};
   userLoggedIn:string = window.localStorage.getItem("userLoggedIn") || '';
  constructor(){
   this.route.queryParams.subscribe((queryParams)=>{
    this.queryParams=queryParams;
   })
  

  }

  formatObject(object:any):string{
    return Object.values(object).join("");
  }

  logOut(){
   this.userLoggedIn = "false";
   let username = this.formatObject(this.queryParams.username);
   username ="";
   window.localStorage.setItem("userLoggedIn",this.userLoggedIn);
   this.router.navigate(['/'],{queryParams:{username:username}}).then(()=>{
    window.location.reload();
   });
   
   
  
  }
 
}
