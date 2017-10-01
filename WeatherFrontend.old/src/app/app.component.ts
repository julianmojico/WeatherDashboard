import { Component, OnInit,EventEmitter, Input, Output } from '@angular/core';
import { StompService } from 'ng2-stomp-service';
import { WebsocketService } from "./websocket.service";
import { HttpServiceService } from "./http-service.service";
import { HttpErrorResponse } from "@angular/common/http";




@Component({
  selector: 'app-root', 
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [WebsocketService,StompService,HttpServiceService],
   viewProviders: [AppComponent,HttpServiceService]
})


export class AppComponent implements OnInit  {

 
  selectedDash :  Dashboard  = new Dashboard();
  dashboardList : Dashboard[];

  
 constructor(private ws:WebsocketService, private httpservice: HttpServiceService ) {

  
    this.httpservice = httpservice;
 
}

ngOnInit() {

   //the following code is for inintialization of dashboard.    
        let newDash = this.selectedDash
        newDash.name="Max Powers"
    
        this.httpservice.postDashboard(newDash);
    
        let updatedDash = this.selectedDash
        let locat1:Location = new Location();
        locat1.locationName="UpdatedLocation1";
        locat1.woeid=2222;
        let updatedLocations: Location[] = [locat1];
        updatedDash.locations= updatedLocations;
    
        
        this.httpservice.postDashboard(updatedDash);
        
   
}




createNewDash(name:string){

  let newDash = new Dashboard();
  newDash.name=name;
  this.httpservice.postDashboard(newDash);
  this.httpservice.updateDashboardList();
  this.selectedDash=newDash;
}


   onSelect (dash:Dashboard): void {
    this.selectedDash = dash
    this.ws.send(dash.name);
   }

}


export class Dashboard{

  contructor(name:string){
    this.name=name;
  }
  name: string;
  locations: Location[];
  query: any;
}

export class Location {

  constructor(){};
  woeid: number;
  locationName: string;
  locationStatus: JSON;

}

export class WeatherStatus {
    status:JSON;
}

export class status{



}

