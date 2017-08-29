/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.agilisys.weatherdashboard;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;

/**
 *
 * @author Julian.Mojico
 */

@RestController
@Configuration
public class LocationControllerRest {
    
           
    @Autowired
    private LocationRepo repo;
   
    @RequestMapping(method = RequestMethod.GET, value = "/locations")
    public @ResponseBody List<Location> getLocations() {
        return repo.findAll();
    }
    
     @RequestMapping(method = RequestMethod.GET, value = "/locations/query")
    public @ResponseBody String getQuery() {
        return parseQuery();
    }
    
    public String parseQuery() {
       
        final StringBuilder chars = new StringBuilder();       
        chars.append("( ");
        repo.findAll().forEach((Location location)-> chars.append("\""+location.getWoeid()+"\","));
        chars.deleteCharAt(chars.length() - 1);
        chars.append(")");
        String aux = "select * from weather.forecast where woeid in" +chars ;
        return aux;
    }
    
}
