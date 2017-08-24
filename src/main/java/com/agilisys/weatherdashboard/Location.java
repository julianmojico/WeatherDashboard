/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.agilisys.weatherdashboard;

/**
 *
 * @author Julian
 */
public class Location {
    
    private int woeid;
    private String locationName;

    public Location(int woeid,String locationName){
        this.woeid = woeid;
        this.locationName = locationName;
    }
    
      public Location(){
        this.woeid = woeid;
        this.locationName = locationName;
    }
    /**
     * @return the woeid
     */
    public int getWoeid() {
        return woeid;
    }

    /**
     * @param woeid the woeid to set
     */
    public void setWoeid(int woeid) {
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
