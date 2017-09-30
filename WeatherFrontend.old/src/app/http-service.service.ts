import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Dashboard } from "./app.component";
import {HttpClientModule} from '@angular/common/http';
import { Observable } from "rxjs/Observable";


@Injectable()
export class HttpServiceService implements OnInit{

    results: string;

   
    constructor(private http: HttpClient) {}

public handleError(error: any): Promise<any> {
  console.error('An error occurred', error); // for demo purposes only
  return Promise.reject(error.message || error);
}

ngOnInit(): void {
  this.http.get('http://localhost:8080/dashboards').subscribe(data => {this.results = JSON.stringify(data)});
}

/*
const headers = new HttpHeaders()
            .set('Access-Control-Allow-Origin','*')
            .set('Content-Type': 'application/json');
           // .set('Origin','localhost:8080');
      // Make the HTTP request:
 return Promise.resolve(this.http.get('http://localhost:8080/dashboards', {headers,responseType: "json"}).toPromise().then(response => response.json() as Dashboard[])
 .catch(this.handleError));
    //  throw new Error('Method not implemented.');
*/
   }
