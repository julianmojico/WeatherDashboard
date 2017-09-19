import { Component } from '@angular/core';

import { StompService } from 'ng2-stomp-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {


  //generate input simulation

  dash1: Dashboard = {

    id: "Fulano",
    locations: [ {woeid:123,locationName:"invalidLocation"},{woeid:2487889,"locationName" : "San Diego, CA"}   ]
    }
  

  initialDashboard = new Dashboard();
  private dashboards = ['Fulano','Mengano'];

  //generate input simulation
  
  private subscription : any;
  title = 'Weather Dashboard';
  selectedDash :  Dashboard;
  dashboardList : Dashboard[];
  se
 
   onSelect (dash:Dashboard): void {
    this.selectedDash = dash
   }

  //response 
    public response = (data) => {
    console.log(data)
  }

  constructor(stomp: StompService) {
    
   
  
     //configuration 
     stomp.configure({
  
       host:'http://127.0.0.1:8080/api',
       debug:true,
       queue:{'init':true}
     });
     
     //start connection 
     stomp.startConnect().then(() => {
       stomp.done('init');
       console.log('connected');
       
       //subscribe 
       this.subscription = stomp.subscribe('/feed', this.response);
       
       //send data 
       
       stomp.send("/app/status", this.selectedDash );
       
       /*
       //unsubscribe 
       this.subscription.unsubscribe();
       
       //disconnect 
       stomp.disconnect().then(() => {
         console.log( 'Connection closed' )
       })
       */
     });
    



}



}


export class Dashboard{
  id: string;
  locations: Location[];
}

export class Location {
  woeid: number;
  locationName: string;

}