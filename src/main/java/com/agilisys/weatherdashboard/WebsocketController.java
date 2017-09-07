/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.agilisys.weatherdashboard;

import com.agilisys.Application;
import com.mongodb.BasicDBObject;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.Mongo;
import com.mongodb.util.JSON;
import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URL;
import java.util.Date;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

/**
 *
 * @author Julian.Mojico
 */
//TODO:Probar/corregir websockets

@Controller
public class WebsocketController {
    
    @Autowired
    private DashboardController dash;
   
   // @Autowired
  //  private Query query;
    
    /*
   @MessageMapping("/status") 
   @SendTo("/feed")
    public Location getLocationStatus (Location inputLocation) {
           Location response = service.getLocationByWoeid(inputLocation.getWoeid());
            return response;
      
        
    } */
    

   @MessageMapping("/status") 
   @SendTo("/feed")
    public String getWeatherStatus (String dashid) throws MalformedURLException, URISyntaxException, Exception {
        
         final StringBuilder chars = new StringBuilder();       
        chars.append("( ");
        dash.getDashboard(dashid).getLocations().forEach((Location location)-> chars.append("\""+location.getWoeid()+"\","));
         chars.deleteCharAt(chars.length() - 1);
        chars.append(")");
        String aux = "select * from weather.forecast where woeid in " +chars+" and u='c'";
        //u=c stands for units celcius
            
              String urlStr = "https://query.yahooapis.com/v1/public/yql?q="+aux+"&format=json";
              URL url = new URL(urlStr);
              URI uri = new URI(url.getProtocol(), url.getUserInfo(), url.getHost(), url.getPort(), url.getPath(), url.getQuery(), url.getRef());
              String uriEncoded = uri.toString();
              String responseBody = null;
              
                   try {
                responseBody = HTTPRequest.getHTML(uriEncoded);
                System.out.println("Performing HTTP call to: "+uriEncoded);
              } catch (IOException ex)
              {  
                Logger.getLogger(Application.class.getName()).log(Level.WARNING,"HTTP Bad Request: " + ex.toString() + "\n Check locations collection is not empty",ex);
              }
             
           
            
            Query queryResult = new Query(dashid,responseBody);
            //TODO: Poner esto scheduled (El ejemplo debe estar en historial de la comput del work  
              Mongo mongo = new Mongo("localhost", 27017);
			DB db = mongo.getDB("local");
			DBCollection collection = db.getCollection("weather");
                        Date date = new Date();
                        long timestamp = date.getTime() / 1000;
                        
                        //force the id so each time data is retrieved, it overwrites the previous status
                        ObjectId id= new ObjectId("59a82d091b26d81ea4e6238c");
                        System.out.println("Current timestamp(unix format): "+timestamp);
                        
                        
			// convert JSON to DBObject directly
                        
			BasicDBObject dbObject = (BasicDBObject) JSON
					.parse(responseBody);
                                       
                        //String timestamp = date.getTime();
                        //Logger.getLogger(Application.class.getName()).log(Level.INFO, date.toString());
                        dbObject.append("_id",id);
			//collection.insert(dbObject);
                        collection.insert(dbObject);
                        
                         //TODO: Salvar query al collection.
                               
            
              return responseBody;
    } 
   
}
