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
import com.agilisys.weatherdashboard.DashboardController;
import com.agilisys.weatherdashboard.WebsocketController;
import com.mongodb.BasicDBObject;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.Mongo;
import com.mongodb.util.JSON;
import java.io.IOException;
import java.net.URI;
import java.net.URL;
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
	private DashboardController dash;

        @Autowired
        private WebsocketController webSocket;
    

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}

	@Override
	public void run(String... args) throws Exception {

                
                Logger.getLogger("org.agilisys").setLevel(Level.WARNING);
                
                Dashboard dashBoard = new Dashboard("Fulano");
                dashBoard.addLocation("2487889", "San Diego, CA");
                dash.postDashboard(dashBoard);
               
            
            
                   
              
                    
             
	}

}
