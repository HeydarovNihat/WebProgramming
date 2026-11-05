export class Tournaments {
   private image:string;
   private name:string;
   private startTime:string;
   private reportTime:string;
   private players:string[];

   constructor(image:string="",name:string="",startTime:string="",reportTime:string="",players:string[]=[]){
   this.image=image;
   this.name=name;
   this.startTime=startTime;
   this.reportTime=reportTime;
   this.players=players;

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
   setStartDate(startTime:string=""){
      this.startTime = startTime;
   }
   getStartDate(){
      return this.startTime;
   }
   setReportTime(reportTime:string=""){
      this.reportTime=reportTime;
   }
   getReportTime(){
      return this.reportTime;
   }
   setPlayers(players:string[]=[]){
      this.players=players;
   }
   getPlayers(){
      return this.players;
   }
   
}
