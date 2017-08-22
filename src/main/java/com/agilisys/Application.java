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
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;


@SpringBootApplication
public class Application implements CommandLineRunner {

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


	}

}
