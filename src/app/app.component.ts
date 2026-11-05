import { Component,inject } from '@angular/core';
import { RouterLink, RouterOutlet,RouterLinkActive,ActivatedRoute,Router} from '@angular/router';
import { User } from './Models/user';
import {CommonModule} from '@angular/common';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet,RouterLink,RouterLinkActive,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'WebProgrammingProject';
  route = inject(ActivatedRoute);
  router = inject(Router);
  queryParams:{username?: string,role?:string}={};
  userLoggedIn:string = window.localStorage.getItem("userLoggedIn") || '';
  username:string="";
  
  constructor(){
    
   this.route.queryParams.subscribe((queryParams)=>{
    this.queryParams = queryParams;
    
   })
   
   this.InitiallizationAfterLogin();
  

   
  
   
   console.log(this.userLoggedIn);
   
   
  }
  formatObject(object:any): string{
    return Object.values(object).join('');
  }

  InitiallizationAfterLogin(){
    let username = this.queryParams?.username ? this.formatObject(this.queryParams?.username) : '';
    if(username.length !== 0){
     window.location.reload();
    }
  }
  
  //username:string = this.formatObject(this.queryParams.username);  

    homeClicked(){
      const username = this.queryParams?.username || '';
      const role =this.queryParams?.role || '';
    
      this.router.navigate(['/'],{queryParams:{username:username,role:role}});
     
      
    }

  tournamentsClicked(){
    const username = this.queryParams?.username || '';
    const role =this.queryParams?.role || '';
    
      this.router.navigate(['/Tournaments-component'],{queryParams:{username:username,role:role}});
  }
  coursesClicked(){
    const username = this.queryParams?.username || '';
    const role =this.queryParams?.role || '';
   
    this.router.navigate(['/Courses-component'],{queryParams:{username:username, role:role}});
  }
  logoutClicked(){
    const username = this.queryParams?.username || '';
    const role =this.queryParams?.role || '';
    this.router.navigate(['/Logout-component'],{queryParams:{username:username, role:role}});
  }
 
}
