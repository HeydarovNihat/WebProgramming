import { Component,inject } from '@angular/core';
import {FormGroup,FormControl,ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {User} from '../Models/user';
import {Router} from '@angular/router';


@Component({
  selector: 'app-registration',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css',
})
export class RegistrationComponent {
   users:Array<User>=[];
   router = inject(Router);
   successfullyCreatedMessage:string = "";
   usernameExistanceMessage:string = "";
   retrievedUser:User[] = JSON.parse(window.localStorage.getItem("users")|| '[]');
   imageFile:any = null;
  userForm = new FormGroup({
    firstName : new FormControl(''),
    lastName : new FormControl(''),
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl('')
  })

  onImageLoaded(event:any){
    this.imageFile = event.target.files[0].name
  console.log(this.imageFile);
  }

onSubmit(){
 let user:User = new User(
  this.userForm?.value?.firstName ?? '',
  this.userForm?.value?.lastName?? '',
  this.userForm?.value?.username?? '',
  this.userForm?.value?.email?? '',
  this.userForm?.value?.password?? ''
);



  if(this.usernameExistanceChecker(user.username)=== true){
  this.usernameExistanceMessage = "User already exists...";
  setTimeout(()=>{
    this.usernameExistanceMessage=""
  },1500);
  }else{
    user.setRole("player");
    this.users.push(user);
  window.localStorage.setItem("users",JSON.stringify(this.users));
console.log(this.users);

this.successfullyCreatedMessage="User successfully created...";

setTimeout(()=>{
this.router.navigateByUrl("/Login-component");
},1500);

  }
  
}

usernameExistanceChecker(username:string=""):boolean{
  for(let index=0; index<this.retrievedUser.length;index++){
    let retrievedUsername = this.retrievedUser[index].username;
    if(retrievedUsername === username){
      return true;
    }
  }
  return false;
}




}
