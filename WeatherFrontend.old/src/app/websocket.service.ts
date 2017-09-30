import { Injectable, OnInit } from '@angular/core';
import { StompService } from "ng2-stomp-service";

@Injectable()
export class WebsocketService {
  
private subscription : any;

public datastream : any;

private getData(data){
  let debug = 1;
  this.datastream=JSON.stringify(data.query);
  
}

public response = (data) => {

  console.log("data:" + JSON.stringify(data));
  this.datastream = JSON.stringify(data);
  
  return data;
}

  
    constructor(stomp: StompService) {
    
   
  
     //configuration 
     stomp.configure({
  
       host:'http://127.0.0.1:8080/api',
       debug:true,
       queue:{'init':true}
     });
     
   
    
     //start connection 
    stomp.startConnect().then(res => {
       stomp.done('init');
       console.log('connected');
     
       //subscribe 
       var aux;
       this.subscription = stomp.subscribe('/feed',   (data) =>{
         
        if (data) this.getData((data)) 
        //else console.log("error retrieving stomp subscription: "+err);
      
      }
      
      );

       
       //send data 
       
       //stomp.send('destionation',{"data":"data"});
       stomp.send("/app/status", "Mengano");
       
       /*
       //unsubscribe 
       this.subscription.unsubscribe();
       
       //disconnect 
       stomp.disconnect().then(() => {
         console.log( 'Connection closed' )
       })
       */

this.datastream = "res";

let debug="a";

});
    
  let aux2;

  }

}