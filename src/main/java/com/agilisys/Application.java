/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.agilisys;

/**
 *
 * @author Julian
 */

import com.agilisys.weatherdashboard.HTTPRequest;
import com.agilisys.weatherdashboard.Dashboard;
import com.agilisys.weatherdashboard.DashboardRepo;
import com.agilisys.weatherdashboard.LocationRepo;
import com.agilisys.weatherdashboard.Location;
import com.agilisys.weatherdashboard.LocationControllerWS;
import com.agilisys.weatherdashboard.LocationService;
import com.mongodb.BasicDBObject;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBObject;
import com.mongodb.Mongo;
import com.mongodb.util.JSON;
import java.io.IOException;
import static java.lang.System.console;
import java.net.URI;
import java.net.URL;
import java.util.ArrayList;
import java.util.Date;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;


@SpringBootApplication
public class Application implements CommandLineRunner {

    private final static Logger LOGGER = Logger.getLogger(Application.class.getName());
    
	@Autowired
	private DashboardRepo dashRepo;

        @Autowired
        private LocationService location;

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}

	@Override
	public void run(String... args) throws Exception {

                
                Logger.getLogger("org.agilisys").setLevel(Level.WARNING);
                
		dashRepo.deleteAll();

		//create sample dashboard
                Dashboard sampleDash = new Dashboard("Smith");
                
                sampleDash.addLocation(2487889, "San Diego, CA");
                sampleDash.addLocation(2487882, "Test");
		dashRepo.save(sampleDash);
		
                

		// fetch all users
		System.out.println("Users found with findAll():");
		System.out.println("-------------------------------");
		for (Dashboard dash : dashRepo.findAll()) {
			System.out.println(dash);
		}
		System.out.println();
                
               System.out.println(dashRepo.findLocationsBywoeid(123));
               System.out.println(dashRepo.findLocationsBywoeid(2487889));
               System.out.println(dashRepo.findLocationsBylocationName("San.*"));
               System.out.println(dashRepo.findAll());
               
               //TODO: Poner esto scheduled (El ejemplo debe estar en historial de la comput del work
               
              String query = location.locationsQuery(); 
              System.out.println("YQL :" + query);
              
              
              //Yahoo API HTTP Call
              
              String urlStr = "https://query.yahooapis.com/v1/public/yql?q="+query+"&format=json";
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
                        
                    
             
	}

}
