import { Component, OnInit,EventEmitter, Input, Output } from '@angular/core';
import { StompService } from 'ng2-stomp-service';
import { WebsocketService } from "./websocket.service";
//import { HttpServiceService } from "./http-service.service";
import { HttpClient } from "@angular/common/http";




@Component({
  selector: 'app-root', 
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [WebsocketService,HttpClient,StompService],
   viewProviders: [HttpClient, AppComponent]
})


export class AppComponent  implements OnInit  {

  selectedDash :  Dashboard  = new Dashboard();
  dashboardList : Dashboard[];
  weatherStatuses:WeatherStatus[];
  status =  this.ws.datastream;
  
 constructor(public ws:WebsocketService,  public http: HttpClient) {

  

}


  
ngOnInit(): void {

  
  //console.log("response websocket:"+this.ws.response2);

  this.http.get<Dashboard[]>('http://localhost:8080/dashboards').subscribe(data => {
    // Read the result field from the JSON response.
    this.dashboardList = data;
    this.selectedDash = this.dashboardList[0];
    //this.ws.response(data => this.selectedDash.query = data);
    
  });


}


   onSelect (dash:Dashboard): void {
    this.selectedDash = dash
   }

}


export class Dashboard{
  name: string;
  locations: Location[];
  query: any;
}

export class Location {
  woeid: number;
  locationName: string;

}

export class WeatherStatus {
    status:JSON;
}

