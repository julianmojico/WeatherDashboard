/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.agilisys.weatherdashboard;

import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 *
 * @author Julian.Mojico
 */
//TODO:Probar/corregir websockets

@Controller
public class LocationControllerWS {
    
           
    @Autowired
    private LocationService service;
   
    
    @MessageMapping("/location/status/") // /hello  if a message is sent to destination "/location/status/{id}", then the greetinggetLocationbyId() method is called.
    @SendTo("/weather/status") // /topic/greetings return value of method is broadcasted to all subscribers to "/queue/status"
    public @ResponseBody Location getLocationStatus (@Validated @PathVariable("woeid") String woeid) {
        return service.getLocationById(woeid);
    } 
   
}
