/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.agilisys.weatherdashboard;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Component;

/**
 *
 * @author Julian
 */
@Component

public interface  DashboardRepo extends MongoRepository<Dashboard,String>{
    public Dashboard findLocationsBywoeid(int woeid);
    
  
    
   
}
