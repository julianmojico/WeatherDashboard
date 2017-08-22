/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.agilisys.weatherdashboard;

import java.util.ArrayList;
import org.springframework.data.annotation.Id;

/**
 *
 * @author Julian
 */
public class Dashboard {
    
   @Id
   private final String name;
   private final ArrayList<Location>  locations;
   
   public Dashboard(String name) {
        this.locations = new ArrayList();
       this.name = name;
   }
   
   //woeid is location reference used by yahoo weather API
   public void addLocation(int woeid, String locationName) {
       Location location = new Location(woeid,locationName);
       this.locations.add(location);
   }
   
   public void removeLocation(int woeid, String locationName) {
       this.locations.remove(new Location(woeid,locationName));
   }

   public Location searchLocation(int idx){
       return this.locations.get(idx);
   }
}
