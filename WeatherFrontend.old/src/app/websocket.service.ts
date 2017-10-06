import { Injectable, OnInit } from '@angular/core';
import { StompService } from "ng2-stomp-service";

@Injectable()
export class WebsocketService {
  

stomp:StompService
//public datastream : any = "emptyBuffer"
public datastream : Promise<any>
subscription: Promise<void>


public response = (data) => {

  //console.log("data:" + JSON.stringify(data));

  let prom = new Promise<any>((resolve,reject)=>{resolve(data),reject(console.log("error in websocket promise"))})
  this.datastream=prom

  return prom;
}

  
    constructor(stomp: StompService) {
     
     //configuration 
     stomp.configure({
  
       host:'http://127.0.0.1:8080/api',
       debug:true,
       queue:{'init':true}
     });
     
   
    
     //start connection 
     this.subscription = stomp.startConnect().then(res => {
       stomp.done('init');
       console.log('connected');
     
       //subscribe 
    stomp.subscribe('/feed', this.response);

       
       //send data 
       
       //stomp.send('destionation',{"data":"data"});
       stomp.send("/app/status", "FulanoBE");
       
       /*
       //unsubscribe 
       this.subscription.unsubscribe();
       
       //disconnect 
       stomp.disconnect().then(() => {
         console.log( 'Connection closed' )
       })
       */
}, err=>{console.log("Error retrieving data from websocket: "+err)})

//save stomp status for later use
this.stomp=stomp;
  }

  send(dashId:string){
    
    //clean previous dashboard weather status
    this.datastream=null;
    this.stomp.send("/app/status",dashId);
  }

}