import { Component } from '@angular/core';

import { StompService } from 'ng2-stomp-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {


  //generate input simulation
 
  
  initialDashboard = new Dashboard();
  title = 'Weather Dashboard';
  selectedDash :  Dashboard;
  dashboardList : Dashboard[];


  constructor() {
  
  this.dashboardList = [

      //generate input simulation
    {

    id: "Fulano",
    locations: [ {woeid:123,locationName:"invalidLocation"},{woeid:2487889,"locationName" : "San Diego, CA"}   ]
    },

    {

    id: "Mengano",
    locations: [ {woeid:64189,locationName:"	Ciudad de la Habana, Cuba"},{woeid:2338936,"locationName" : "Istanbul, Buyukcekmece"}   ]
  }
  ]
  
}

  getId (dash:Dashboard): string {
    return dash.id;
  }
 
   onSelect (dash:Dashboard): void {
    this.selectedDash = dash
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