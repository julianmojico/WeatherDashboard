import { Component, OnInit } from '@angular/core';
import { StompService } from 'ng2-stomp-service';
import { WebsocketService } from "./websocket.service";
import { HttpServiceService } from "./http-service.service";




@Component({
  selector: 'app-root', 
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [WebsocketService,HttpServiceService],
   viewProviders: [HttpServiceService]
})


export class AppComponent  {
  
  selectedDash :  Dashboard;
  dashboardList : Dashboard[];
  wsService: WebsocketService;
  weatherStatuses:WeatherStatus[];
  
  
 constructor(private ws:WebsocketService, private http:HttpServiceService) {

 
  
    let sampleDash =
    {

    id: "Fulano",
    locations: [ {woeid:123,locationName:"invalidLocation"},{woeid:2487889,"locationName" : "San Diego, CA"}   ],
    query: '{"query":{"count":1,"created":"2017-09-20T03:49:25Z","lang":"en-US","results":{"channel":{"units":{"distance":"km","pressure":"mb","speed":"km/h","temperature":"C"},"title":"Yahoo! Weather - San Diego, CA, US","link":"http://us.rd.yahoo.com/dailynews/rss/weather/Country__Country/*https://weather.yahoo.com/country/state/city-2487889/","description":"Yahoo! Weather for San Diego, CA, US","language":"en-us","lastBuildDate":"Tue, 19 Sep 2017 08:49 PM PDT","ttl":"60","location":{"city":"San Diego","country":"United States","region":" CA"},"wind":{"chill":"72","direction":"270","speed":"11.27"},"atmosphere":{"humidity":"69","pressure":"33863.90","rising":"0","visibility":"25.91"},"astronomy":{"sunrise":"6:35 am","sunset":"6:50 pm"},"image":{"title":"Yahoo! Weather","width":"142","height":"18","link":"http://weather.yahoo.com","url":"http://l.yimg.com/a/i/brand/purplelogo//uh/us/news-wea.gif"},"item":{"title":"Conditions for San Diego, CA, US at 08:00 PM PDT","lat":"32.831699","long":"-117.122002","link":"http://us.rd.yahoo.com/dailynews/rss/weather/Country__Country/*https://weather.yahoo.com/country/state/city-2487889/","pubDate":"Tue, 19 Sep 2017 08:00 PM PDT","condition":{"code":"27","date":"Tue, 19 Sep 2017 08:00 PM PDT","temp":"21","text":"Mostly Cloudy"},"forecast":[{"code":"30","date":"19 Sep 2017","day":"Tue","high":"26","low":"20","text":"Partly Cloudy"},{"code":"30","date":"20 Sep 2017","day":"Wed","high":"25","low":"19","text":"Partly Cloudy"},{"code":"28","date":"21 Sep 2017","day":"Thu","high":"22","low":"19","text":"Mostly Cloudy"},{"code":"30","date":"22 Sep 2017","day":"Fri","high":"23","low":"18","text":"Partly Cloudy"},{"code":"34","date":"23 Sep 2017","day":"Sat","high":"23","low":"17","text":"Mostly Sunny"},{"code":"32","date":"24 Sep 2017","day":"Sun","high":"27","low":"16","text":"Sunny"},{"code":"34","date":"25 Sep 2017","day":"Mon","high":"28","low":"17","text":"Mostly Sunny"},{"code":"32","date":"26 Sep 2017","day":"Tue","high":"29","low":"18","text":"Sunny"},{"code":"32","date":"27 Sep 2017","day":"Wed","high":"30","low":"19","text":"Sunny"},{"code":"34","date":"28 Sep 2017","day":"Thu","high":"30","low":"20","text":"Mostly Sunny"}],"description":"<![CDATA[<img src=\"http://l.yimg.com/a/i/us/we/52/27.gif\"/>\n<BR />\n<b>Current Conditions:</b>\n<BR />Mostly Cloudy\n<BR />\n<BR />\n<b>Forecast:</b>\n<BR /> Tue - Partly Cloudy. High: 26Low: 20\n<BR /> Wed - Partly Cloudy. High: 25Low: 19\n<BR /> Thu - Mostly Cloudy. High: 22Low: 19\n<BR /> Fri - Partly Cloudy. High: 23Low: 18\n<BR /> Sat - Mostly Sunny. High: 23Low: 17\n<BR />\n<BR />\n<a href=\"http://us.rd.yahoo.com/dailynews/rss/weather/Country__Country/*https://weather.yahoo.com/country/state/city-2487889/\">Full Forecast at Yahoo! Weather</a>\n<BR />\n<BR />\n<BR />\n]]>","guid":{"isPermaLink":"false"}}}}}}'
    }


  
     //this.selectedDash = sampleDash;
     this.dashboardList = this.http.getDashboard() ;
   //   this.selectedDash = this.dashboardList[0]||sampleDash;
    // this.selectedDash.query = ws.response; 
}


  


   onSelect (dash:Dashboard): void {
    this.selectedDash = dash
   }

}


export class Dashboard{
  id: string;
  locations: Location[];
  query: any;
 // status:WeatherStatus;

   getId (dash:Dashboard): string {
    return this.id;
  }
 
}

export class Location {
  woeid: number;
  locationName: string;

}

export class WeatherStatus {
    status:JSON;
}

