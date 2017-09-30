import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from "@angular/common/http";
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { StompService } from 'ng2-stomp-service';
import { HttpServiceService } from './http-service.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { WebsocketService } from "./websocket.service";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, HttpClientModule
  ],
  providers: [StompService,HttpServiceService,WebsocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }