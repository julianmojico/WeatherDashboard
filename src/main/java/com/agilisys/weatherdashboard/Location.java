/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.agilisys.weatherdashboard;

import org.springframework.data.annotation.Id;


/**
 *
 * @author Julian
 */


public class Location {
    
    
    @Id
    private String woeid;
    private String locationName;
    

    public Location(String woeid,String locationName){
        
        
        this.woeid = woeid;
        this.locationName = locationName;
    }
    
    public Location(){
        
    }
    
    /**
     * @return the woeid
     */
    public String getWoeid() {
        return this.woeid;
    }

    /**
     * @param woeid the woeid to set
     */
    public void setWoeid(String woeid) {
        this.woeid = woeid;
    }

    /**
     * @return the locationName
     */
    public String getLocationName() {
        return locationName;
    }
    

    /**
     * @param locationName the locationName to set
     */
    public void setLocationName(String locationName) {
        this.locationName = locationName;
    }
    
}
