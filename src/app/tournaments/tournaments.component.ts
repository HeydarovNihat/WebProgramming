import { Component,inject } from '@angular/core';
import {Tournaments} from '../Models/tournaments';
import {CommonModule} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {Tournament} from '../Models/tournament'
@Component({
  selector: 'app-tournaments',
  imports: [CommonModule],
  templateUrl: './tournaments.component.html',
  styleUrl: './tournaments.component.css'
})
export class TournamentsComponent {
  route = inject(ActivatedRoute);
  userLoggedIn:string = window.localStorage.getItem("userLoggedIn") || "";
  queryParams:{username?: string} = {};
  players:string[]=[];
  warning:string="";
  successfullyJoinedMessage:string ="";
tournaments:Tournaments[]=[];
menTournament:Tournaments = new Tournaments("badminton1.jpg","Men's Doubles (Open)","10:00 am","9:45 pm");
womenTournament:Tournaments = new Tournaments("badminton1.jpg","Women's Doubles (Open)","10:00 am","9:45 pm");
tournamentsObject:Tournament[] = JSON.parse(window.localStorage.getItem("tournamentObjects") || '[]');
beforeLogin:string="";
constructor() {
 
     this.beforeLogin = "Please first login...";
  setTimeout(()=>{
    this.beforeLogin = "";
  },1000);
  
 
  this.tournaments.push(this.menTournament);
  this.tournaments.push(this.womenTournament);
 // let retrievedOnes=this.tournamentsObject.map(data => new Tournaments(data.image, data.name, data.startTime, data.reportTime, data.players))
 // this.tournaments.push(retrievedOnes[0]);

  this.route.queryParams.subscribe((queryParams) => {
    this.queryParams = queryParams;
  });

  console.log(this.tournaments);
}

formatObject(object:any):string{
  return Object.entries(object).map((name)=>`${name}`).join(", ");
}

onJoin(name:string=""){
 for(let index=0;index<this.tournaments.length;index++){
  let retrievedName = this.tournaments[index].getName();
  let retrievedUsernames = this.tournaments[index].getPlayers();
  let username = this.formatObject(this.queryParams.username);
  if(retrievedName === name){
    
    if(this.usernameExistanceChecker(retrievedUsernames,username) === true){
     this.warning="User already exists in that tournament...";
    setTimeout(()=>{
    this.warning = "";
    },1000)
      
    }else{
      this.successfullyJoinedMessage = "User successfully joined...";
      setTimeout(()=>{
        this.successfullyJoinedMessage="";
      },1000)
      this.players=this.tournaments[index].getPlayers();
    this.players.push(this.formatObject(this.queryParams.username));
    this.tournaments[index].setPlayers(this.players);
     console.log(this.tournaments[index]);
    }
    
  }
 window.localStorage.setItem("tournamentObjects",JSON.stringify(this.tournaments));
 this.onUpdatePage();
 }
 
 
}


onLeave(name:string=""){
  for(let index=0;index<this.tournaments.length;index++){
   let retrievedName = this.tournaments[index].getName();
   let retrievedUsernames = this.tournaments[index].getPlayers();
   let username = this.formatObject(this.queryParams.username);
   if(retrievedName === name){
     
     if(this.usernameExistanceChecker(retrievedUsernames,username) === true){
      let retrievedusernames = this.deleteUsername(this.tournaments[index].getPlayers(),username);
      this.tournaments[index].setPlayers(retrievedusernames);
      this.successfullyJoinedMessage = "You are successfully leave...";
      setTimeout(()=>{
      this.successfullyJoinedMessage = "";
       
     },1000)
    }else{
      this.warning = "You aren't joined...";
          setTimeout(()=>{
          this.warning = "";
        },1000);
        
     }
     
   }
  window.localStorage.setItem("tournamentObjects",JSON.stringify(this.tournaments));
  this.onUpdatePage();
  }
  
  
 }


onUpdatePage(){
  console.log(this.tournaments);
}

usernameExistanceChecker(retrievedUsernames:string[],username:string):boolean{

return retrievedUsernames.includes(username);

}
deleteUsername(retrievedStudents:string[]=[],username:string=""){
  let students = retrievedStudents;
  for(let index=0;index<students.length;index++){
    if(students[index] === username){
      students[index] = "";
    }
  }
  return students;
}

}
