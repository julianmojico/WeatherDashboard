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

import com.agilisys.weatherdashboard.DashboardController;
import com.agilisys.weatherdashboard.WebsocketController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.logging.Level;
import java.util.logging.Logger;


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
                
                /* Sample data:
                Dashboard dashBoard = new Dashboard("FulanoBE");
                dashBoard.addLocation("2487889", "San Diego, CA");
                dashBoard.addLocation("2487449", "PEPE San Diego, CA");
                dashBoard.addLocation("1111", "Villa Adelina,SA");
                
                Dashboard dashBoard2 = new Dashboard("MenganoBE");
                dashBoard2.addLocation("11111", "SampleLocation1");
                dashBoard.addLocation("1234", "SampleLocation2");
                
                dash.postDashboard(dashBoard);
                dash.postDashboard(dashBoard2);
                //dash.getDashboard("Fulano");
                
*               */
            
            
                   
              
                    
             
	}

}
