import { Component,inject,ViewChild,ElementRef } from '@angular/core';
import{ActivatedRoute,Router} from '@angular/router';
import{CommonModule} from '@angular/common';
import{User} from '../Models/user';


@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  userLoggedIn:string = window.localStorage.getItem("userLoggedIn") || '';
  route = inject(ActivatedRoute);
  router = inject(Router);
  queryParams:{username?: string}={};
  @ViewChild('mensDoublesModal') mensDoubleModal :ElementRef|undefined;
  @ViewChild('womensDoublesModal') womensDoubleModal :ElementRef|undefined;
  @ViewChild('mixedDoublesModal') mixedDoublesModal :ElementRef|undefined;
  constructor(){
    console.log(this.userLoggedIn);

    this.InitiallizationAfterLogin();
    
  }
  InitiallizationAfterLogin(){
    let username = this.queryParams?.username ? this.formatObject(this.queryParams?.username) : '';
    if(username.length !== 0){
    }
  }
  formatObject(object:any): string{
    return Object.values(object).join('');
  }
  
  openMensDoubles(){
  if(this.mensDoubleModal){
   this.mensDoubleModal.nativeElement.style.display="block";
  }
  }
  closeMensDoubles(){
    if(this.mensDoubleModal){
      this.mensDoubleModal.nativeElement.style.display="none";
    }
  }
  openWomensDoubles(){
    if(this.womensDoubleModal){
     this.womensDoubleModal.nativeElement.style.display="block";
    }
    }
    closeWomensDoubles(){
      if(this.womensDoubleModal){
        this.womensDoubleModal.nativeElement.style.display="none";
      }
    }
    openMixedDoubles(){
      if(this.mixedDoublesModal){
        this.mixedDoublesModal.nativeElement.style.display="block";
       }
    }
    closeMixedDoubles(){
      if(this.mixedDoublesModal){
        this.mixedDoublesModal.nativeElement.style.display="none";
       }
    }

  

}
