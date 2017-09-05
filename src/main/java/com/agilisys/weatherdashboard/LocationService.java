/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.agilisys.weatherdashboard;


import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author Julian.Mojico
 */

//@EnableMongoRepositories(basePackages = "com.applesauce.repository")
@Service
public class LocationService {
    
    @Autowired
    private LocationRepo locationRepo;
    
    
    public String locationsQuery() {
        
        final StringBuilder chars = new StringBuilder();       
        chars.append("( ");
        locationRepo.findAll().forEach((Location location)-> chars.append("\""+location.getWoeid()+"\","));
        chars.deleteCharAt(chars.length() - 1);
        chars.append(")");
        String aux = "select * from weather.forecast where woeid in " +chars+"and u='c'";
        //u=c stands for units celcius
        return aux;
    }
    
    public Location addLocation(Location location) {
        
        locationRepo.save(location);
        //@TODO: Add logging information of this event.
        return location;
        
    }
    
        public ArrayList<Location> addLocation(ArrayList<Location> location) {
        
        locationRepo.save(location);
        //@TODO: Add logging information of this event.
        return location;
        
    }
    
    public Location getLocationById (String woeid) {
         //@TODO: Add logging information of this event.
            return locationRepo.findOne(woeid);
            
}
}