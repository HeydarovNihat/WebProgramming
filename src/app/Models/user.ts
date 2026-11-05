export class User {
     firstName:string;
     lastName:string;
     username:string;
     emailAddress:string;
     password:string;
     role:string;
    

    constructor( firstName:string="", lastName:string="", username:string="", emailAddress:string="",  password:string="", role:string=""){
        this.firstName = firstName;
        this.lastName= lastName;
        this.username=username;
        this.emailAddress = emailAddress;
        this.password= password;
        this.role = role;
     
    
}



setFirstName(firstName:string=""){
    this.firstName=firstName;
}

getFirstName(){
    return this.firstName;
}


setLastName(lastName:string=""){
 this.lastName=lastName;
}

getLastName(){
    return this.lastName;
}

setUsername(username:string=""){
 this.username = username;
}

getUsername(){
    return this.username;
}

setEmailAddress(emailAddress:string=""){
    this.emailAddress =emailAddress;
}

getEmailAddress(){
    return this.emailAddress;
}

setPassword(password:string=""){
    this.password=password;
}

getPassword(){
    return this.password;
}

setRole(role:string=""){
     this.role=role;
}
getRole(){
    return this.role;
}


}