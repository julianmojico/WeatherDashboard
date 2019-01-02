/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.agilisys.weatherdashboard;

import org.springframework.data.annotation.Id;

import java.io.Serializable;
import java.util.ArrayList;

/**
 *
 * @author Julian
 */
public class Dashboard implements Serializable {
    
   @Id
   private String name;
   private ArrayList<Location>  locations;
   private String query;
   
   public Dashboard(String name) {
        this.locations = new ArrayList();
       this.name = name;
   }
   
   public Dashboard() {
 
   }
   
   //woeid is location reference used by yahoo weather API
   public void addLocation(String woeid, String locationName) {
       Location location = new Location(woeid,locationName);
       this.getLocations().add(location);
   }
   
   public void removeLocation(String woeid, String locationName) {
       this.getLocations().remove(new Location(woeid,locationName));
   }

   public Location searchLocation(int idx){
       return this.getLocations().get(idx);
   }

    /**
     * @return the name
     */
    public String getName() {
        return name;
    }

    /**
     * @param name the name to set
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * @return the locations
     */
    public ArrayList<Location> getLocations() {
        return locations;
    }

    /**
     * @param locations the locations to set
     */
    public void setLocations(ArrayList<Location> locations) {
        this.locations = locations;
    }

    /**
     * @return the query
     */
    public String getQuery() {
        return query;
    }

    /**
     * @param query the query to set
     */
    public void setQuery(String query) {
        this.query = query;
    }
}
