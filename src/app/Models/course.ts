export class Course {
    private image:string;
    private name:string;
    private tutorName:string;
    private weekFrequency:string;
    private startTime:string;
    private students:string[];

    constructor(image:string="",name:string="",tutorName:string="",weekFrequency:string="",startTime:string="",students:string[]=[]){
        this.image=image;
        this.name=name;
        this.tutorName=tutorName;
        this.weekFrequency=weekFrequency;
        this.startTime=startTime;
        this.students = students; 
    }

    setImage(image:string=""){
        this.image=image;
    }
    getImage(){
        return this.image;
    }
    setName(name:string=""){
        this.name=name;
    }
    getName(){
        return this.name;
    }
    setTutorName(tutorName:string=""){
        this.tutorName=tutorName;
    }
    getTutorName(){
        return this.tutorName;
    }
    setWeekFrequency(weekFrequency:string=""){
        this.weekFrequency=weekFrequency;        
    }
    getWeekFrequency(){
        return this.weekFrequency;
    }
    setStartTime(startTime:string=""){
        this.startTime=startTime;
    }
    getStartTime(){
        return this.startTime;
    }
    setStudents(students:string[]=[]){
        this.students=students;
    }
    getStudents(){
        return this.students;
    }
}
