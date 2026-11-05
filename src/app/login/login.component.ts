import { Component, inject} from '@angular/core';
import {User} from '../Models/user'
import {FormGroup,FormControl,ReactiveFormsModule} from '@angular/forms'
import {RouterModule,Router} from '@angular/router'
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
 router = inject(Router);

   userLoggedIn:boolean = false;
users:User[] = (JSON.parse(window.localStorage.getItem("users") || '[]')as any[]).map(user => Object.assign(new User(),user));
userLogin = new FormGroup({
  emailAddress : new FormControl(''),
  password : new FormControl('')
});

onSubmit(){
for(let index = 0; index<this.users.length; index++){
    let emailAddress:string = this.users[index].getEmailAddress();
    let password:string = this.users[index].getPassword();
    let username:string = this.users[index].getUsername();
   if(emailAddress === this.userLogin.value.emailAddress && password === this.userLogin.value.password){
    console.log("Logged in successfully...");
   let role:string = this.users[index].getRole();
   this.userLoggedIn = true;
   window.localStorage.setItem("userLoggedIn", "true");
  this.router.navigate(['/'],{queryParams:{username:username,role:role}}).then(()=>{
    window.location.reload();
  });
 
   console.log(this.userLoggedIn);
   }else{
    console.log("Logged in unsuccessfully...");
   }
  }

}
}

