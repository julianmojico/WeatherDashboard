/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.agilisys.weatherdashboard;

import java.util.ArrayList;
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


@Configuration
@EnableWebSocketMessageBroker
public class LocationControllerWS {
    
           
    @Autowired
    private LocationService service;
   
    
    @MessageMapping("/location/status/{woeid}") // /hello  if a message is sent to destination "/location/status/{id}", then the greetinggetLocationbyId() method is called.
    @SendTo("/queue/status") // /topic/greetings return value of method is broadcasted to all subscribers to "/queue/status"
    public @ResponseBody Location getLocationbyId (@Validated @PathVariable("woeid") String woeid) {
        return service.getLocationById(woeid);
    }
    
    @MessageMapping("/location/status/{woeid}") // /hello  if a message is sent to destination "/location/status/{id}", then the greetinggetLocationbyId() method is called.
    @SendTo("/queue/status") // /topic/greetings return value of method is broadcasted to all subscribers to "/queue/status"
    public void insertLocation (Location location) {
        service.addLocation(location);
    }
    
    //method overload
     @MessageMapping("/location/status/{woeid}") // /hello  if a message is sent to destination "/location/status/{id}", then the greetinggetLocationbyId() method is called.
    @SendTo("/queue/status") // /topic/greetings return value of method is broadcasted to all subscribers to "/queue/status"
    public void insertLocation (ArrayList<Location> locations) {
        service.addLocation(locations);
    }
  
   
}
