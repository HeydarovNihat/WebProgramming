import { Component,inject } from '@angular/core';
import{ActivatedRoute} from '@angular/router';
import{CommonModule} from '@angular/common';
import{User} from '../Models/user';
import{Course} from '../Models/course';
import{CourseData} from '../Models/course-data';

@Component({
  selector: 'app-courses',
  imports: [CommonModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent {
  
 route = inject(ActivatedRoute);
  queryParams:{username?:string}={};
  userLoggedIn:string = window.localStorage.getItem("userLoggedIn") || "";
  courses:Course[]=[];
 course1:Course = new Course("badminton1.jpg","Zero to Hero in Badminton","Tutor1","3","10 pm");
 course2:Course = new Course("badminton1.jpg","Become expert in Badminton","Tutor2","3","11 pm");
 students:string[]=[];
 addedDetailsToCourses:CourseData[] = JSON.parse(window.localStorage.getItem("courses")||'[]'); 
 warning:string = "";
 beforeLogin:string="";
 successfullyJoinedMessage:string = "";
  constructor(){
    this.beforeLogin = "Please first login...";
    setTimeout(()=>{
      this.beforeLogin = "";
    },1000);
   this.route.queryParams.subscribe((queryParams)=>{
    this.queryParams = queryParams;
   })
   this.courses.push(this.course1);
   this.courses.push(this.course2);
  // this.courses = this.addedDetailsToCourses.map(data => new Course(data.image,data.name,data.tutorName,data.weekFrequency,data.startTime,data.students));
   
  }
  formatObject(object:any): string{
    return Object.entries(object).map((data) => `${data}`).join(', ');
  }
  onJoin(name:string=""){
    for(let index=0;index<this.courses.length;index++){
      let courseName = this.courses[index].getName();
      this.students = this.courses[index].getStudents();
      let username = this.formatObject(this.queryParams.username);
      if(name === courseName){
        if(this.usernameExistanceChecker(this.courses[index].getStudents(),username) === true){
         console.log("username already exists...");
         this.warning = "You have already joined...";
         setTimeout(()=>{
          this.warning = ""
         },1000);
        }else{
          this.successfullyJoinedMessage = "You are success fully joined...";
          setTimeout(()=>{
          this.successfullyJoinedMessage = "";
        },1000);
          this.students.push(username);
        this.courses[index].setStudents(this.students);
        
        }
      }
    }
    console.log(this.courses);
    window.localStorage.setItem("courses",JSON.stringify(this.courses));

  }

  onLeave(name:string=""){
    for(let index=0;index<this.courses.length;index++){
      let courseName = this.courses[index].getName();
      this.students = this.courses[index].getStudents();
     
      let username = this.formatObject(this.queryParams.username);
      if(name === courseName){
        if(this.usernameExistanceChecker(this.courses[index].getStudents(),username) === true){
        let retrievedStudents = this.deleteUsername(this.courses[index].getStudents(),username);
        this.courses[index].setStudents(retrievedStudents);
        this.successfullyJoinedMessage = "You are successfully leave...";
        setTimeout(()=>{
        this.successfullyJoinedMessage = "";
      },1000);
        }else{
         
          this.warning = "You aren't joined...";
          setTimeout(()=>{
          this.warning = "";
        },1000);
        
        }
      }
    }
    console.log(this.courses);
    window.localStorage.setItem("courses",JSON.stringify(this.courses));

  }

  usernameExistanceChecker(retrievedUsernames:string[],username:string){
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
