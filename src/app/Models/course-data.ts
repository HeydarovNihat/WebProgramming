export class CourseData {
    image:string;
    name:string;
    tutorName:string;
    weekFrequency:string;
    startTime:string;
    students:string[];

    constructor(image:string="",name:string="",tutorName:string="",weekFrequency:string="",startTime:string="",students:string[]=[]){
        this.image=image;
        this.name=name;
        this.tutorName=tutorName;
        this.weekFrequency=weekFrequency;
        this.startTime = startTime;
        this.students = students;
    }

}
