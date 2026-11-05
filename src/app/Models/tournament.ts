export class Tournament {
    image:string;
    name:string;
    startTime:string;
    reportTime:string;
    players:string[];

    constructor(image:string="",name:string="",startTime="",reportTime="",players:string[]=[]){
        this.image=image;
        this.name=name;
        this.startTime=startTime;
        this.reportTime=reportTime;
        this.players=players;
    }
}
