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
   viewProviders: [AppComponent,HttpServiceService,WebsocketService]
})


export class AppComponent implements OnInit  {

  
  selectedDash :  Dashboard  = new Dashboard();
  dashboardList : Dashboard[];
  
  
 constructor(private ws:WebsocketService, private httpservice: HttpServiceService ) {
 
  this.ws=ws
  this.httpservice = httpservice;
 
}

ngOnInit() {

}


addLocation(locat:string){
  //input format : "Woeid,City,Country"

  let data = locat.split(',');
  let location = new Location(parseInt(data[0]),data[1]+", "+data[2])
  this.selectedDash.locations.push(location); 
  //perform selection on the item to force refresh lists in the web
  this.onSelect(this.selectedDash);
  //impact changes in the backend
  this.httpservice.postDashboard(this.selectedDash);
  this.parseWeather();
}

createNewDash(name:string){

  let newDash = new Dashboard();
  newDash.name=name;
  this.httpservice.postDashboard(newDash);
  this.selectedDash=newDash;
  this.httpservice.updateDashboardList();

}


   onSelect (dash:Dashboard): void {

    //clean weather from previous dash
    this.ws.datastream=null
    this.selectedDash = dash
    this.ws.send(dash.name);
    this.parseWeather();
   }

   parseWeather(){

        
      //clean weather from previous dash

      //clean historic status
      this.selectedDash.status = null;
      console.log("Parsing Weather Status..")
//      JSON.parse(this.ws.datastream)['results']['channel'].forEach(element => {
  let statusArray = new Array();
  let context = this;
  this.ws.stomp.subscribe("/feed",data=>{
    
    
    if (!Array.isArray(data.query.results.channel)) {
        
      //when two or more locations,parse as array (because of query results)

        let arr = new Array()
        arr.push(data.query.results.channel)
        let debug = 3; 
    
      arr.forEach(element => {
            let status:Status = new Status();
            status.title=element.item.title.split(',')[0]+','+element.item.title.split(',')[1]
            status.conditionDate=element.item.condition.date
            status.conditionTemp=element.item.condition.temp
            status.conditionText=element.item.condition.text
            status.windSpeed=element.wind.speed
            status.windDirection=element.wind.direction
            statusArray.push(status)
          });
          context.selectedDash.status=statusArray
        } else {
        
              //when two or more locations,parse as array (because of query results)
            
              data.query.results.channel.forEach(element => {
              let status:Status = new Status();
              status.title=element.item.title.split(',')[0]+','+element.item.title.split(',')[1]
              status.conditionDate=element.item.condition.date
              status.conditionTemp=element.item.condition.temp
              status.conditionText=element.item.condition.text
              status.windSpeed=element.wind.speed
              status.windDirection=element.wind.direction
              statusArray.push(status)
            });
            context.selectedDash.status=statusArray
        } }
  
  )
    }



}



export class Dashboard{

  contructor(name:string){
    this.name=name;
    this.status = [];
  }
  name: string;
  locations: Location[]  = new Array();;
  status: Status[] = new Array() ;
}

export class Location {

  constructor(woeid:number,locationName:string){
    this.woeid=woeid
    this.locationName=locationName

  };
  woeid: number;
  locationName: string;
}


export class Status{

  title
  wind
  atmosphere
  astronomy
  image
  conditionTemp
  conditionText
  conditionDate
  windSpeed
  windDirection


}

