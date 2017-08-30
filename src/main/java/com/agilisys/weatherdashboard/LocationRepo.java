/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.agilisys.weatherdashboard;


import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

/**
 *
 * @author Julian.Mojico
 */

//@Component
@Repository
public interface LocationRepo extends MongoRepository<Location,String> {
    
    @Query ("{'locations.woeid':?0}")
    public Dashboard findDashboardBywoeid(int woeid);
    
}

