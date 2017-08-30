/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.agilisys.weatherdashboard;

import org.springframework.beans.factory.annotation.Autowired;

/**
 *
 * @author Julian.Mojico
 */
public class WeatherController {
    
   @Autowired
   private LocationService ws;
    
   public WeatherController() {
       
       
   }
    
}
