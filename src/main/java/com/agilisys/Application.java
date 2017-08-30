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
import java.net.URI;
import java.net.URL;
import java.util.ArrayList;
import java.util.logging.Logger;
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
        private LocationService weather;

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}

	@Override
	public void run(String... args) throws Exception {

		dashRepo.deleteAll();

		//create sample dashboard
                Dashboard sampleDash = new Dashboard("Smith");
                
                sampleDash.addLocation(2487889, "San Diego, CA");
                sampleDash.addLocation(2487882, "Test");
		dashRepo.save(sampleDash);
		
                

		// fetch all customers
		System.out.println("Customers found with findAll():");
		System.out.println("-------------------------------");
		for (Dashboard dash : dashRepo.findAll()) {
			System.out.println(dash);
		}
		System.out.println();
                
               System.out.println(dashRepo.findLocationsBywoeid(123));
               System.out.println(dashRepo.findLocationsBywoeid(2487889));
               System.out.println(dashRepo.findLocationsBylocationName("San.*"));
               System.out.println(dashRepo.findAll());
               
              String query = weather.locationsQuery(); 
              System.out.println(weather.locationsQuery());
              String urlStr = "https://query.yahooapis.com/v1/public/yql?q="+query+"&format=json";
              URL url = new URL(urlStr);
              URI uri = new URI(url.getProtocol(), url.getUserInfo(), url.getHost(), url.getPort(), url.getPath(), url.getQuery(), url.getRef());
              String uriEncoded = uri.toString();
              System.out.println("Performing HTTP call to: "+uriEncoded);
              String responseBody = HTTPRequest.getHTML(uriEncoded);
              System.out.println(responseBody);
               
               /*
               LocationControllerWS locations = new LocationControllerWS();
               ArrayList<Location> arrLocat =  (ArrayList<Location>)locations.getLocations();
               System.out.println(arrLocat.toString());
               */
                
              
               //String responseBody = HTTPRequest.getHTML(locations.getQuery());
               //System.out.println(responseBody);
                 // LOGGER.info(responseBody.toString());
       
	}

}
