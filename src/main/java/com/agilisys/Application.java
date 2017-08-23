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

import com.agilisys.weatherdashboard.Dashboard;
import com.agilisys.weatherdashboard.DashboardRepo;
import com.mongodb.util.JSON;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;


@SpringBootApplication
public class Application implements CommandLineRunner {

    private final static Logger LOGGER = Logger.getLogger(Application.class.getName());
    
	@Autowired
	private DashboardRepo repository;

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}

	@Override
	public void run(String... args) throws Exception {

		repository.deleteAll();

		//create sample dashboard
                Dashboard sampleDash = new Dashboard("Smith");
                
                sampleDash.addLocation(2487889, "San Diego, CA");
                sampleDash.addLocation(2487882, "Test");
		repository.save(sampleDash);
		
                

		// fetch all customers
		System.out.println("Customers found with findAll():");
		System.out.println("-------------------------------");
		for (Dashboard dash : repository.findAll()) {
			System.out.println(dash);
		}
		System.out.println();
                
               System.out.println(repository.findLocationsBywoeid(123));
               System.out.println(repository.findLocationsBywoeid(2487889));
               System.out.println(repository.findLocationsBylocationName("San.*"));
               System.out.println(repository.findAll());
          

                RestTemplate restTemplate = new RestTemplate();
                Object[] result = restTemplate.getForObject("https://query.yahooapis.com/v1/public/yql?q=select%20item.condition%20from%20weather.forecast%20where%20woeid%20%3D%202487889&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys", Object[].class);

        LOGGER.info(result.toString());
	}

}
