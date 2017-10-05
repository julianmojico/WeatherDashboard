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

   //the following code is for inintialization of dashboard. 
   /*
   
        let newDash = new Dashboard();
        newDash.name="Max Powers"
        let locat1:Location = new Location(2460286,"nome");
        newDash.locations.push(locat1)
        this.httpservice.postDashboard(newDash);   

        */
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
}

createNewDash(name:string){

  let newDash = new Dashboard();
  newDash.name=name;
  this.httpservice.postDashboard(newDash);
  this.httpservice.updateDashboardList();
  this.selectedDash=newDash;
}


   onSelect (dash:Dashboard): void {

    //clean weather from previous dash
    this.ws.datastream=null
    this.selectedDash = dash
    this.ws.send(dash.name);
    let sampleData ={"query": {
         "count": 13,
         "created": "2017-10-02T09:08:03Z",
         "lang": "en-US",
         "results": {
            "channel": [
               {
                  "units": {
                     "distance": "km",
                     "pressure": "mb",
                     "speed": "km/h",
                     "temperature": "C"
                  },
                  "title": "Yahoo! Weather - Barcelona, Catalonia, ES",
                  "description": "Yahoo! Weather for Barcelona, Catalonia, ES",
                  "language": "en-us",
                  "lastBuildDate": "Mon, 02 Oct 2017 11:08 AM CEST",
                  "ttl": "60",
                  "location": {
                     "city": "Barcelona",
                     "country": "Spain",
                     "region": " Catalonia"
                  },
                  "wind": {
                     "chill": "66",
                     "direction": "325",
                     "speed": "11.27"
                  },
                  "atmosphere": {
                     "humidity": "80",
                     "pressure": "34371.86",
                     "rising": "0",
                     "visibility": "25.91"
                  },
                  "astronomy": {
                     "sunrise": "7:50 am",
                     "sunset": "7:30 pm"
                  },
                  "image": {
                     "title": "Yahoo! Weather",
                     "width": "142",
                     "height": "18"
                  },
                  "item": {
                     "title": "Conditions for Barcelona, Catalonia, ES at 10:00 AM CEST",
                     "lat": "41.39917",
                     "long": "2.15397",
                     "pubDate": "Mon, 02 Oct 2017 10:00 AM CEST",
                     "condition": {
                        "code": "26",
                        "date": "Mon, 02 Oct 2017 10:00 AM CEST",
                        "temp": "19",
                        "text": "Cloudy"
                     },
                     "forecast": [
                        {
                           "code": "12",
                           "date": "02 Oct 2017",
                           "day": "Mon",
                           "high": "22",
                           "low": "17",
                           "text": "Rain"
                        },
                        {
                           "code": "28",
                           "date": "03 Oct 2017",
                           "day": "Tue",
                           "high": "25",
                           "low": "18",
                           "text": "Mostly Cloudy"
                        },
                        {
                           "code": "30",
                           "date": "04 Oct 2017",
                           "day": "Wed",
                           "high": "23",
                           "low": "16",
                           "text": "Partly Cloudy"
                        },
                        {
                           "code": "30",
                           "date": "05 Oct 2017",
                           "day": "Thu",
                           "high": "26",
                           "low": "16",
                           "text": "Partly Cloudy"
                        },
                        {
                           "code": "12",
                           "date": "06 Oct 2017",
                           "day": "Fri",
                           "high": "22",
                           "low": "17",
                           "text": "Rain"
                        },
                        {
                           "code": "30",
                           "date": "07 Oct 2017",
                           "day": "Sat",
                           "high": "22",
                           "low": "13",
                           "text": "Partly Cloudy"
                        },
                        {
                           "code": "30",
                           "date": "08 Oct 2017",
                           "day": "Sun",
                           "high": "22",
                           "low": "14",
                           "text": "Partly Cloudy"
                        },
                        {
                           "code": "30",
                           "date": "09 Oct 2017",
                           "day": "Mon",
                           "high": "20",
                           "low": "14",
                           "text": "Partly Cloudy"
                        },
                        {
                           "code": "30",
                           "date": "10 Oct 2017",
                           "day": "Tue",
                           "high": "20",
                           "low": "13",
                           "text": "Partly Cloudy"
                        },
                        {
                           "code": "47",
                           "date": "11 Oct 2017",
                           "day": "Wed",
                           "high": "21",
                           "low": "13",
                           "text": "Scattered Thunderstorms"
                        }
                     ],
                     "guid": {
                        "isPermaLink": "false"
                     }
                  }
               },
               {
                  "units": {
                     "distance": "km",
                     "pressure": "mb",
                     "speed": "km/h",
                     "temperature": "C"
                  },
                  "title": "Yahoo! Weather - Frankfurt, HE, DE",
                  "description": "Yahoo! Weather for Frankfurt, HE, DE",
                  "language": "en-us",
                  "lastBuildDate": "Mon, 02 Oct 2017 11:08 AM CEST",
                  "ttl": "60",
                  "location": {
                     "city": "Frankfurt",
                     "country": "Germany",
                     "region": " HE"
                  },
                  "wind": {
                     "chill": "52",
                     "direction": "205",
                     "speed": "17.70"
                  },
                  "atmosphere": {
                     "humidity": "90",
                     "pressure": "33897.76",
                     "rising": "0",
                     "visibility": "25.75"
                  },
                  "astronomy": {
                     "sunrise": "7:28 am",
                     "sunset": "7:0 pm"
                  },
                  "image": {
                     "title": "Yahoo! Weather",
                     "width": "142",
                     "height": "18"
                  },
                  "item": {
                     "title": "Conditions for Frankfurt, HE, DE at 10:00 AM CEST",
                     "lat": "50.11208",
                     "long": "8.68341",
                     "pubDate": "Mon, 02 Oct 2017 10:00 AM CEST",
                     "condition": {
                        "code": "11",
                        "date": "Mon, 02 Oct 2017 10:00 AM CEST",
                        "temp": "12",
                        "text": "Showers"
                     },
                     "forecast": [
                        {
                           "code": "12",
                           "date": "02 Oct 2017",
                           "day": "Mon",
                           "high": "16",
                           "low": "9",
                           "text": "Rain"
                        },
                        {
                           "code": "11",
                           "date": "03 Oct 2017",
                           "day": "Tue",
                           "high": "15",
                           "low": "10",
                           "text": "Showers"
                        },
                        {
                           "code": "28",
                           "date": "04 Oct 2017",
                           "day": "Wed",
                           "high": "15",
                           "low": "7",
                           "text": "Mostly Cloudy"
                        },
                        {
                           "code": "39",
                           "date": "05 Oct 2017",
                           "day": "Thu",
                           "high": "15",
                           "low": "10",
                           "text": "Scattered Showers"
                        },
                        {
                           "code": "30",
                           "date": "06 Oct 2017",
                           "day": "Fri",
                           "high": "13",
                           "low": "8",
                           "text": "Partly Cloudy"
                        },
                        {
                           "code": "28",
                           "date": "07 Oct 2017",
                           "day": "Sat",
                           "high": "13",
                           "low": "8",
                           "text": "Mostly Cloudy"
                        },
                        {
                           "code": "28",
                           "date": "08 Oct 2017",
                           "day": "Sun",
                           "high": "14",
                           "low": "7",
                           "text": "Mostly Cloudy"
                        },
                        {
                           "code": "28",
                           "date": "09 Oct 2017",
                           "day": "Mon",
                           "high": "13",
                           "low": "7",
                           "text": "Mostly Cloudy"
                        },
                        {
                           "code": "28",
                           "date": "10 Oct 2017",
                           "day": "Tue",
                           "high": "14",
                           "low": "6",
                           "text": "Mostly Cloudy"
                        },
                        {
                           "code": "28",
                           "date": "11 Oct 2017",
                           "day": "Wed",
                           "high": "14",
                           "low": "6",
                           "text": "Mostly Cloudy"
                        }
                     ],
                     "guid": {
                        "isPermaLink": "false"
                     }
                  }
               },
               {
                  "units": {
                     "distance": "km",
                     "pressure": "mb",
                     "speed": "km/h",
                     "temperature": "C"
                  }
               },
               {
                  "units": {
                     "distance": "km",
                     "pressure": "mb",
                     "speed": "km/h",
                     "temperature": "C"
                  }
               },
               {
                  "units": {
                     "distance": "km",
                     "pressure": "mb",
                     "speed": "km/h",
                     "temperature": "C"
                  },
                  "title": "Yahoo! Weather - Berlin, BE, DE",
                  "description": "Yahoo! Weather for Berlin, BE, DE",
                  "language": "en-us",
                  "lastBuildDate": "Mon, 02 Oct 2017 11:08 AM CEST",
                  "ttl": "60",
                  "location": {
                     "city": "Berlin",
                     "country": "Germany",
                     "region": " BE"
                  },
                  "wind": {
                     "chill": "50",
                     "direction": "185",
                     "speed": "22.53"
                  },
                  "atmosphere": {
                     "humidity": "81",
                     "pressure": "34202.54",
                     "rising": "0",
                     "visibility": "25.91"
                  },
                  "astronomy": {
                     "sunrise": "7:10 am",
                     "sunset": "6:40 pm"
                  },
                  "image": {
                     "title": "Yahoo! Weather",
                     "width": "142",
                     "height": "18"
                  },
                  "item": {
                     "title": "Conditions for Berlin, BE, DE at 10:00 AM CEST",
                     "lat": "52.516071",
                     "long": "13.37698",
                     "pubDate": "Mon, 02 Oct 2017 10:00 AM CEST",
                     "condition": {
                        "code": "26",
                        "date": "Mon, 02 Oct 2017 10:00 AM CEST",
                        "temp": "12",
                        "text": "Cloudy"
                     },
                     "forecast": [
                        {
                           "code": "11",
                           "date": "02 Oct 2017",
                           "day": "Mon",
                           "high": "15",
                           "low": "10",
                           "text": "Showers"
                        },
                        {
                           "code": "28",
                           "date": "03 Oct 2017",
                           "day": "Tue",
                           "high": "15",
                           "low": "11",
                           "text": "Mostly Cloudy"
                        },
                        {
                           "code": "26",
                           "date": "04 Oct 2017",
                           "day": "Wed",
                           "high": "13",
                           "low": "10",
                           "text": "Cloudy"
                        },
                        {
                           "code": "11",
                           "date": "05 Oct 2017",
                           "day": "Thu",
                           "high": "12",
                           "low": "10",
                           "text": "Showers"
                        },
                        {
                           "code": "12",
                           "date": "06 Oct 2017",
                           "day": "Fri",
                           "high": "13",
                           "low": "9",
                           "text": "Rain"
                        },
                        {
                           "code": "28",
                           "date": "07 Oct 2017",
                           "day": "Sat",
                           "high": "13",
                           "low": "8",
                           "text": "Mostly Cloudy"
                        },
                        {
                           "code": "28",
                           "date": "08 Oct 2017",
                           "day": "Sun",
                           "high": "13",
                           "low": "7",
                           "text": "Mostly Cloudy"
                        },
                        {
                           "code": "28",
                           "date": "09 Oct 2017",
                           "day": "Mon",
                           "high": "13",
                           "low": "7",
                           "text": "Mostly Cloudy"
                        },
                        {
                           "code": "28",
                           "date": "10 Oct 2017",
                           "day": "Tue",
                           "high": "13",
                           "low": "6",
                           "text": "Mostly Cloudy"
                        },
                        {
                           "code": "28",
                           "date": "11 Oct 2017",
                           "day": "Wed",
                           "high": "13",
                           "low": "7",
                           "text": "Mostly Cloudy"
                        }
                     ],
                     "guid": {
                        "isPermaLink": "false"
                     }
                  }
               },
               {
                  "units": {
                     "distance": "km",
                     "pressure": "mb",
                     "speed": "km/h",
                     "temperature": "C"
                  }
               },
               {
                  "units": {
                     "distance": "km",
                     "pressure": "mb",
                     "speed": "km/h",
                     "temperature": "C"
                  },
                  "title": "Yahoo! Weather - Foggia, PU, IT",
                  "description": "Yahoo! Weather for Foggia, PU, IT",
                  "language": "en-us",
                  "lastBuildDate": "Mon, 02 Oct 2017 11:08 AM CEST",
                  "ttl": "60",
                  "location": {
                     "city": "Foggia",
                     "country": "Italy",
                     "region": " PU"
                  },
                  "wind": {
                     "chill": "63",
                     "direction": "115",
                     "speed": "6.44"
                  },
                  "atmosphere": {
                     "humidity": "68",
                     "pressure": "33220.49",
                     "rising": "0",
                     "visibility": "25.91"
                  },
                  "astronomy": {
                     "sunrise": "6:55 am",
                     "sunset": "6:35 pm"
                  },
                  "image": {
                     "title": "Yahoo! Weather",
                     "width": "142",
                     "height": "18"
                  },
                  "item": {
                     "title": "Conditions for Foggia, PU, IT at 10:00 AM CEST",
                     "lat": "41.502789",
                     "long": "15.57178",
                     "pubDate": "Mon, 02 Oct 2017 10:00 AM CEST",
                     "condition": {
                        "code": "28",
                        "date": "Mon, 02 Oct 2017 10:00 AM CEST",
                        "temp": "17",
                        "text": "Mostly Cloudy"
                     },
                     "forecast": [
                        {
                           "code": "39",
                           "date": "02 Oct 2017",
                           "day": "Mon",
                           "high": "18",
                           "low": "11",
                           "text": "Scattered Showers"
                        },
                        {
                           "code": "34",
                           "date": "03 Oct 2017",
                           "day": "Tue",
                           "high": "20",
                           "low": "11",
                           "text": "Mostly Sunny"
                        },
                        {
                           "code": "47",
                           "date": "04 Oct 2017",
                           "day": "Wed",
                           "high": "21",
                           "low": "13",
                           "text": "Scattered Thunderstorms"
                        },
                        {
                           "code": "34",
                           "date": "05 Oct 2017",
                           "day": "Thu",
                           "high": "21",
                           "low": "12",
                           "text": "Mostly Sunny"
                        },
                        {
                           "code": "34",
                           "date": "06 Oct 2017",
                           "day": "Fri",
                           "high": "21",
                           "low": "12",
                           "text": "Mostly Sunny"
                        },
                        {
                           "code": "23",
                           "date": "07 Oct 2017",
                           "day": "Sat",
                           "high": "14",
                           "low": "10",
                           "text": "Breezy"
                        },
                        {
                           "code": "30",
                           "date": "08 Oct 2017",
                           "day": "Sun",
                           "high": "17",
                           "low": "10",
                           "text": "Partly Cloudy"
                        },
                        {
                           "code": "30",
                           "date": "09 Oct 2017",
                           "day": "Mon",
                           "high": "17",
                           "low": "11",
                           "text": "Partly Cloudy"
                        },
                        {
                           "code": "47",
                           "date": "10 Oct 2017",
                           "day": "Tue",
                           "high": "18",
                           "low": "10",
                           "text": "Scattered Thunderstorms"
                        },
                        {
                           "code": "30",
                           "date": "11 Oct 2017",
                           "day": "Wed",
                           "high": "18",
                           "low": "10",
                           "text": "Partly Cloudy"
                        }
                     ],
                     "guid": {
                        "isPermaLink": "false"
                     }
                  }
               },
               {
                  "units": {
                     "distance": "km",
                     "pressure": "mb",
                     "speed": "km/h",
                     "temperature": "C"
                  },
                  "title": "Yahoo! Weather - Fagernes, Nordland, NO",
                  "description": "Yahoo! Weather for Fagernes, Nordland, NO",
                  "language": "en-us",
                  "lastBuildDate": "Mon, 02 Oct 2017 11:08 AM CEST",
                  "ttl": "60",
                  "location": {
                     "city": "Fagernes",
                     "country": "Norway",
                     "region": " Nordland"
                  },
                  "wind": {
                     "chill": "45",
                     "direction": "110",
                     "speed": "11.27"
                  },
                  "atmosphere": {
                     "humidity": "60",
                     "pressure": "32915.71",
                     "rising": "0",
                     "visibility": "25.91"
                  },
                  "astronomy": {
                     "sunrise": "7:9 am",
                     "sunset": "6:8 pm"
                  },
                  "image": {
                     "title": "Yahoo! Weather",
                     "width": "142",
                     "height": "18"
                  },
                  "item": {
                     "title": "Conditions for Fagernes, Nordland, NO at 10:00 AM CEST",
                     "lat": "68.409637",
                     "long": "17.43383",
                     "pubDate": "Mon, 02 Oct 2017 10:00 AM CEST",
                     "condition": {
                        "code": "28",
                        "date": "Mon, 02 Oct 2017 10:00 AM CEST",
                        "temp": "8",
                        "text": "Mostly Cloudy"
                     },
                     "forecast": [
                        {
                           "code": "39",
                           "date": "02 Oct 2017",
                           "day": "Mon",
                           "high": "11",
                           "low": "6",
                           "text": "Scattered Showers"
                        },
                        {
                           "code": "26",
                           "date": "03 Oct 2017",
                           "day": "Tue",
                           "high": "11",
                           "low": "7",
                           "text": "Cloudy"
                        },
                        {
                           "code": "28",
                           "date": "04 Oct 2017",
                           "day": "Wed",
                           "high": "11",
                           "low": "5",
                           "text": "Mostly Cloudy"
                        },
                        {
                           "code": "28",
                           "date": "05 Oct 2017",
                           "day": "Thu",
                           "high": "11",
                           "low": "5",
                           "text": "Mostly Cloudy"
                        },
                        {
                           "code": "28",
                           "date": "06 Oct 2017",
                           "day": "Fri",
                           "high": "10",
                           "low": "4",
                           "text": "Mostly Cloudy"
                        },
                        {
                           "code": "28",
                           "date": "07 Oct 2017",
                           "day": "Sat",
                           "high": "10",
                           "low": "4",
                           "text": "Mostly Cloudy"
                        },
                        {
                           "code": "28",
                           "date": "08 Oct 2017",
                           "day": "Sun",
                           "high": "10",
                           "low": "2",
                           "text": "Mostly Cloudy"
                        },
                        {
                           "code": "28",
                           "date": "09 Oct 2017",
                           "day": "Mon",
                           "high": "10",
                           "low": "2",
                           "text": "Mostly Cloudy"
                        },
                        {
                           "code": "28",
                           "date": "10 Oct 2017",
                           "day": "Tue",
                           "high": "9",
                           "low": "0",
                           "text": "Mostly Cloudy"
                        },
                        {
                           "code": "28",
                           "date": "11 Oct 2017",
                           "day": "Wed",
                           "high": "8",
                           "low": "1",
                           "text": "Mostly Cloudy"
                        }
                     ],
                     "guid": {
                        "isPermaLink": "false"
                     }
                  }
               },
               {
                  "units": {
                     "distance": "km",
                     "pressure": "mb",
                     "speed": "km/h",
                     "temperature": "C"
                  },
                  "title": "Yahoo! Weather - Newport News, VA, US",
                  "description": "Yahoo! Weather for Newport News, VA, US",
                  "language": "en-us",
                  "lastBuildDate": "Mon, 02 Oct 2017 05:08 AM EDT",
                  "ttl": "60",
                  "location": {
                     "city": "Newport News",
                     "country": "United States",
                     "region": " VA"
                  },
                  "wind": {
                     "chill": "52",
                     "direction": "45",
                     "speed": "11.27"
                  },
                  "atmosphere": {
                     "humidity": "100",
                     "pressure": "34778.23",
                     "rising": "0",
                     "visibility": "7.89"
                  },
                  "astronomy": {
                     "sunrise": "7:0 am",
                     "sunset": "6:46 pm"
                  },
                  "image": {
                     "title": "Yahoo! Weather",
                     "width": "142",
                     "height": "18"
                  },
                  "item": {
                     "title": "Conditions for Newport News, VA, US at 04:00 AM EDT",
                     "lat": "37.1325",
                     "long": "-76.6092",
                     "pubDate": "Mon, 02 Oct 2017 04:00 AM EDT",
                     "condition": {
                        "code": "33",
                        "date": "Mon, 02 Oct 2017 04:00 AM EDT",
                        "temp": "11",
                        "text": "Mostly Clear"
                     },
                     "forecast": [
                        {
                           "code": "34",
                           "date": "02 Oct 2017",
                           "day": "Mon",
                           "high": "21",
                           "low": "12",
                           "text": "Mostly Sunny"
                        },
                        {
                           "code": "30",
                           "date": "03 Oct 2017",
                           "day": "Tue",
                           "high": "21",
                           "low": "14",
                           "text": "Partly Cloudy"
                        },
                        {
                           "code": "34",
                           "date": "04 Oct 2017",
                           "day": "Wed",
                           "high": "23",
                           "low": "15",
                           "text": "Mostly Sunny"
                        },
                        {
                           "code": "34",
                           "date": "05 Oct 2017",
                           "day": "Thu",
                           "high": "25",
                           "low": "18",
                           "text": "Mostly Sunny"
                        },
                        {
                           "code": "34",
                           "date": "06 Oct 2017",
                           "day": "Fri",
                           "high": "25",
                           "low": "20",
                           "text": "Mostly Sunny"
                        },
                        {
                           "code": "30",
                           "date": "07 Oct 2017",
                           "day": "Sat",
                           "high": "24",
                           "low": "20",
                           "text": "Partly Cloudy"
                        },
                        {
                           "code": "30",
                           "date": "08 Oct 2017",
                           "day": "Sun",
                           "high": "24",
                           "low": "19",
                           "text": "Partly Cloudy"
                        },
                        {
                           "code": "47",
                           "date": "09 Oct 2017",
                           "day": "Mon",
                           "high": "24",
                           "low": "19",
                           "text": "Scattered Thunderstorms"
                        },
                        {
                           "code": "30",
                           "date": "10 Oct 2017",
                           "day": "Tue",
                           "high": "23",
                           "low": "19",
                           "text": "Partly Cloudy"
                        },
                        {
                           "code": "23",
                           "date": "11 Oct 2017",
                           "day": "Wed",
                           "high": "21",
                           "low": "17",
                           "text": "Breezy"
                        }
                     ],
                     "guid": {
                        "isPermaLink": "false"
                     }
                  }
               },
               {
                  "units": {
                     "distance": "km",
                     "pressure": "mb",
                     "speed": "km/h",
                     "temperature": "C"
                  },
                  "title": "Yahoo! Weather - Fafal, AS, IN",
                  "description": "Yahoo! Weather for Fafal, AS, IN",
                  "language": "en-us",
                  "lastBuildDate": "Mon, 02 Oct 2017 02:38 PM IST",
                  "ttl": "60",
                  "location": {
                     "city": "Fafal",
                     "country": "India",
                     "region": " AS"
                  },
                  "wind": {
                     "chill": "82",
                     "direction": "293",
                     "speed": "11.27"
                  },
                  "atmosphere": {
                     "humidity": "80",
                     "pressure": "33796.17",
                     "rising": "0",
                     "visibility": "25.91"
                  },
                  "astronomy": {
                     "sunrise": "5:20 am",
                     "sunset": "5:12 pm"
                  },
                  "image": {
                     "title": "Yahoo! Weather",
                     "width": "142",
                     "height": "18"
                  },
                  "item": {
                     "title": "Conditions for Fafal, AS, IN at 01:30 PM IST",
                     "lat": "25.97965",
                     "long": "90.807632",
                     "pubDate": "Mon, 02 Oct 2017 01:30 PM IST",
                     "condition": {
                        "code": "11",
                        "date": "Mon, 02 Oct 2017 01:30 PM IST",
                        "temp": "27",
                        "text": "Showers"
                     },
                     "forecast": [
                        {
                           "code": "47",
                           "date": "02 Oct 2017",
                           "day": "Mon",
                           "high": "27",
                           "low": "23",
                           "text": "Scattered Thunderstorms"
                        },
                        {
                           "code": "47",
                           "date": "03 Oct 2017",
                           "day": "Tue",
                           "high": "28",
                           "low": "23",
                           "text": "Scattered Thunderstorms"
                        },
                        {
                           "code": "4",
                           "date": "04 Oct 2017",
                           "day": "Wed",
                           "high": "31",
                           "low": "23",
                           "text": "Thunderstorms"
                        },
                        {
                           "code": "4",
                           "date": "05 Oct 2017",
                           "day": "Thu",
                           "high": "31",
                           "low": "23",
                           "text": "Thunderstorms"
                        },
                        {
                           "code": "4",
                           "date": "06 Oct 2017",
                           "day": "Fri",
                           "high": "32",
                           "low": "23",
                           "text": "Thunderstorms"
                        },
                        {
                           "code": "4",
                           "date": "07 Oct 2017",
                           "day": "Sat",
                           "high": "30",
                           "low": "24",
                           "text": "Thunderstorms"
                        },
                        {
                           "code": "4",
                           "date": "08 Oct 2017",
                           "day": "Sun",
                           "high": "28",
                           "low": "24",
                           "text": "Thunderstorms"
                        },
                        {
                           "code": "4",
                           "date": "09 Oct 2017",
                           "day": "Mon",
                           "high": "30",
                           "low": "23",
                           "text": "Thunderstorms"
                        },
                        {
                           "code": "4",
                           "date": "10 Oct 2017",
                           "day": "Tue",
                           "high": "26",
                           "low": "23",
                           "text": "Thunderstorms"
                        },
                        {
                           "code": "4",
                           "date": "11 Oct 2017",
                           "day": "Wed",
                           "high": "26",
                           "low": "23",
                           "text": "Thunderstorms"
                        }
                     ],
                     "guid": {
                        "isPermaLink": "false"
                     }
                  }
               },
               {
                  "units": {
                     "distance": "km",
                     "pressure": "mb",
                     "speed": "km/h",
                     "temperature": "C"
                  },
                  "title": "Yahoo! Weather - Inez, KY, US",
                  "description": "Yahoo! Weather for Inez, KY, US",
                  "language": "en-us",
                  "lastBuildDate": "Mon, 02 Oct 2017 05:08 AM EDT",
                  "ttl": "60",
                  "location": {
                     "city": "Inez",
                     "country": "United States",
                     "region": " KY"
                  },
                  "wind": {
                     "chill": "45",
                     "direction": "145",
                     "speed": "22.53"
                  },
                  "atmosphere": {
                     "humidity": "82",
                     "pressure": "33085.03",
                     "rising": "0",
                     "visibility": "25.91"
                  },
                  "astronomy": {
                     "sunrise": "7:24 am",
                     "sunset": "7:10 pm"
                  },
                  "image": {
                     "title": "Yahoo! Weather",
                     "width": "142",
                     "height": "18"
                  },
                  "item": {
                     "title": "Conditions for Inez, KY, US at 04:00 AM EDT",
                     "lat": "37.910519",
                     "long": "-82.550583",
                     "pubDate": "Mon, 02 Oct 2017 04:00 AM EDT",
                     "condition": {
                        "code": "33",
                        "date": "Mon, 02 Oct 2017 04:00 AM EDT",
                        "temp": "8",
                        "text": "Mostly Clear"
                     },
                     "forecast": [
                        {
                           "code": "30",
                           "date": "02 Oct 2017",
                           "day": "Mon",
                           "high": "23",
                           "low": "8",
                           "text": "Partly Cloudy"
                        },
                        {
                           "code": "32",
                           "date": "03 Oct 2017",
                           "day": "Tue",
                           "high": "25",
                           "low": "11",
                           "text": "Sunny"
                        },
                        {
                           "code": "32",
                           "date": "04 Oct 2017",
                           "day": "Wed",
                           "high": "25",
                           "low": "10",
                           "text": "Sunny"
                        },
                        {
                           "code": "30",
                           "date": "05 Oct 2017",
                           "day": "Thu",
                           "high": "25",
                           "low": "12",
                           "text": "Partly Cloudy"
                        },
                        {
                           "code": "28",
                           "date": "06 Oct 2017",
                           "day": "Fri",
                           "high": "25",
                           "low": "14",
                           "text": "Mostly Cloudy"
                        },
                        {
                           "code": "28",
                           "date": "07 Oct 2017",
                           "day": "Sat",
                           "high": "24",
                           "low": "14",
                           "text": "Mostly Cloudy"
                        },
                        {
                           "code": "30",
                           "date": "08 Oct 2017",
                           "day": "Sun",
                           "high": "26",
                           "low": "13",
                           "text": "Partly Cloudy"
                        },
                        {
                           "code": "30",
                           "date": "09 Oct 2017",
                           "day": "Mon",
                           "high": "24",
                           "low": "13",
                           "text": "Partly Cloudy"
                        },
                        {
                           "code": "30",
                           "date": "10 Oct 2017",
                           "day": "Tue",
                           "high": "21",
                           "low": "11",
                           "text": "Partly Cloudy"
                        },
                        {
                           "code": "30",
                           "date": "11 Oct 2017",
                           "day": "Wed",
                           "high": "19",
                           "low": "8",
                           "text": "Partly Cloudy"
                        }
                     ],
                     "guid": {
                        "isPermaLink": "false"
                     }
                  }
               },
               {
                  "units": {
                     "distance": "km",
                     "pressure": "mb",
                     "speed": "km/h",
                     "temperature": "C"
                  },
                  "title": "Yahoo! Weather - Affligem, Vlaams Brabant, BE",
                  "description": "Yahoo! Weather for Affligem, Vlaams Brabant, BE",
                  "language": "en-us",
                  "lastBuildDate": "Mon, 02 Oct 2017 11:08 AM CEST",
                  "ttl": "60",
                  "location": {
                     "city": "Affligem",
                     "country": "Belgium",
                     "region": " Vlaams Brabant"
                  },
                  "wind": {
                     "chill": "59",
                     "direction": "235",
                     "speed": "35.40"
                  },
                  "atmosphere": {
                     "humidity": "83",
                     "pressure": "34202.54",
                     "rising": "0",
                     "visibility": "25.91"
                  },
                  "astronomy": {
                     "sunrise": "7:46 am",
                     "sunset": "7:18 pm"
                  },
                  "image": {
                     "title": "Yahoo! Weather",
                     "width": "142",
                     "height": "18"
                  },
                  "item": {
                     "title": "Conditions for Affligem, Vlaams Brabant, BE at 10:00 AM CEST",
                     "lat": "50.913212",
                     "long": "4.10603",
                     "pubDate": "Mon, 02 Oct 2017 10:00 AM CEST",
                     "condition": {
                        "code": "26",
                        "date": "Mon, 02 Oct 2017 10:00 AM CEST",
                        "temp": "16",
                        "text": "Cloudy"
                     },
                     "forecast": [
                        {
                           "code": "12",
                           "date": "02 Oct 2017",
                           "day": "Mon",
                           "high": "17",
                           "low": "12",
                           "text": "Rain"
                        },
                        {
                           "code": "28",
                           "date": "03 Oct 2017",
                           "day": "Tue",
                           "high": "15",
                           "low": "10",
                           "text": "Mostly Cloudy"
                        },
                        {
                           "code": "26",
                           "date": "04 Oct 2017",
                           "day": "Wed",
                           "high": "15",
                           "low": "10",
                           "text": "Cloudy"
                        },
                        {
                           "code": "39",
                           "date": "05 Oct 2017",
                           "day": "Thu",
                           "high": "14",
                           "low": "11",
                           "text": "Scattered Showers"
                        },
                        {
                           "code": "12",
                           "date": "06 Oct 2017",
                           "day": "Fri",
                           "high": "13",
                           "low": "9",
                           "text": "Rain"
                        },
                        {
                           "code": "28",
                           "date": "07 Oct 2017",
                           "day": "Sat",
                           "high": "12",
                           "low": "8",
                           "text": "Mostly Cloudy"
                        },
                        {
                           "code": "28",
                           "date": "08 Oct 2017",
                           "day": "Sun",
                           "high": "13",
                           "low": "9",
                           "text": "Mostly Cloudy"
                        },
                        {
                           "code": "28",
                           "date": "09 Oct 2017",
                           "day": "Mon",
                           "high": "14",
                           "low": "9",
                           "text": "Mostly Cloudy"
                        },
                        {
                           "code": "39",
                           "date": "10 Oct 2017",
                           "day": "Tue",
                           "high": "13",
                           "low": "8",
                           "text": "Scattered Showers"
                        },
                        {
                           "code": "28",
                           "date": "11 Oct 2017",
                           "day": "Wed",
                           "high": "13",
                           "low": "7",
                           "text": "Mostly Cloudy"
                        }
                     ],
                     "guid": {
                        "isPermaLink": "false"
                     }
                  }
               },
               {
                  "units": {
                     "distance": "km",
                     "pressure": "mb",
                     "speed": "km/h",
                     "temperature": "C"
                  },
                  "title": "Yahoo! Weather - FaquiÃ³s, Galicia, ES",
                  "description": "Yahoo! Weather for FaquiÃ³s, Galicia, ES",
                  "language": "en-us",
                  "lastBuildDate": "Mon, 02 Oct 2017 11:08 AM CEST",
                  "ttl": "60",
                  "location": {
                     "city": "FaquiÃ³s",
                     "country": "Spain",
                     "region": " Galicia"
                  },
                  "wind": {
                     "chill": "61",
                     "direction": "270",
                     "speed": "0.00"
                  },
                  "atmosphere": {
                     "humidity": "92",
                     "pressure": "32340.02",
                     "rising": "0",
                     "visibility": "23.50"
                  },
                  "astronomy": {
                     "sunrise": "8:29 am",
                     "sunset": "8:8 pm"
                  },
                  "image": {
                     "title": "Yahoo! Weather",
                     "width": "142",
                     "height": "18"
                  },
                  "item": {
                     "title": "Conditions for FaquiÃ³s, Galicia, ES at 10:00 AM CEST",
                     "lat": "42.69582",
                     "long": "-7.75106",
                     "pubDate": "Mon, 02 Oct 2017 10:00 AM CEST",
                     "condition": {
                        "code": "30",
                        "date": "Mon, 02 Oct 2017 10:00 AM CEST",
                        "temp": "16",
                        "text": "Partly Cloudy"
                     },
                     "forecast": [
                        {
                           "code": "34",
                           "date": "02 Oct 2017",
                           "day": "Mon",
                           "high": "26",
                           "low": "12",
                           "text": "Mostly Sunny"
                        },
                        {
                           "code": "30",
                           "date": "03 Oct 2017",
                           "day": "Tue",
                           "high": "23",
                           "low": "14",
                           "text": "Partly Cloudy"
                        },
                        {
                           "code": "30",
                           "date": "04 Oct 2017",
                           "day": "Wed",
                           "high": "26",
                           "low": "13",
                           "text": "Partly Cloudy"
                        },
                        {
                           "code": "30",
                           "date": "05 Oct 2017",
                           "day": "Thu",
                           "high": "23",
                           "low": "15",
                           "text": "Partly Cloudy"
                        },
                        {
                           "code": "30",
                           "date": "06 Oct 2017",
                           "day": "Fri",
                           "high": "21",
                           "low": "11",
                           "text": "Partly Cloudy"
                        },
                        {
                           "code": "34",
                           "date": "07 Oct 2017",
                           "day": "Sat",
                           "high": "18",
                           "low": "8",
                           "text": "Mostly Sunny"
                        },
                        {
                           "code": "34",
                           "date": "08 Oct 2017",
                           "day": "Sun",
                           "high": "18",
                           "low": "10",
                           "text": "Mostly Sunny"
                        },
                        {
                           "code": "30",
                           "date": "09 Oct 2017",
                           "day": "Mon",
                           "high": "18",
                           "low": "7",
                           "text": "Partly Cloudy"
                        },
                        {
                           "code": "30",
                           "date": "10 Oct 2017",
                           "day": "Tue",
                           "high": "17",
                           "low": "8",
                           "text": "Partly Cloudy"
                        },
                        {
                           "code": "30",
                           "date": "11 Oct 2017",
                           "day": "Wed",
                           "high": "17",
                           "low": "8",
                           "text": "Partly Cloudy"
                        }
                     ],
                     "guid": {
                        "isPermaLink": "false"
                     }
                  }
               }
            ]
         }
      }
   }
    //this.ws.datastream = sampleData
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
  data.query.results.channel.forEach(element => {
        let status:Status = new Status();
        status.conditionDate=element.item.condition.date
        status.conditionTemp=element.item.condition.temp
        status.conditionText=element.item.condition.text
        status.windSpeed=element.wind.speed
        status.windDirection=element.wind.direction
        statusArray.push(status)
      });
      context.selectedDash.status=statusArray
    }
  
  ).then(this.ws.stomp.send("/app/status", "FulanoBE"));
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

