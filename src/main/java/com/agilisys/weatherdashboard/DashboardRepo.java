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
    
    @Query ("{'locations.woeid':?0}")
    public Dashboard findLocationsBywoeid(int woeid);
    
    @Query ("{'locations.locationName':{ $regex: ?0 }}")
    public Dashboard findLocationsBylocationName(String regexp);
        
   
}
