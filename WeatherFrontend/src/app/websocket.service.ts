import { Injectable } from '@angular/core';
import { StompService } from "ng2-stomp-service";

@Injectable()
export class WebsocketService {
private subscription : any;
private stomp: StompService;

  //response 
    public response = (data) => {
    console.log(data)
    return data;
  }
    constructor(stomp: StompService) {
    
   
  
     //configuration 
     stomp.configure({
  
       host:'http://127.0.0.1:8080/api',
       debug:true,
       queue:{'init':true}
     });
    }
     public connect(){
     //start connection 
     this.stomp.startConnect().then(() => {
       this.stomp.done('init');
       console.log('connected');
     
       //subscribe 
       this.subscription = this.stomp.subscribe('/feed', this.response);
       
       //send data 
       
       this.stomp.send("/app/status", "Fulano");
       
       /*
       //unsubscribe 
       this.subscription.unsubscribe();
       
       //disconnect 
       stomp.disconnect().then(() => {
         console.log( 'Connection closed' )
       })
       */

       return this.response;
     });
    



}



}

