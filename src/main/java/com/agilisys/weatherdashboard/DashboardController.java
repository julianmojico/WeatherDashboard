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
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DashboardController {

    @Autowired
    private DashboardRepo repo;
    
    @RequestMapping(method = RequestMethod.GET, value = "/dashboards/{id}")
    
    public @ResponseBody Dashboard dashboard(@Validated @PathVariable("id") String id) {
        return repo.findOne(id);
    }
    
    @RequestMapping(method = RequestMethod.GET, value = "/dashboards")
    
    public  @ResponseBody List<Dashboard> dashboard() {
       
        return repo.findAll();
// return new ResponseEntity<List<JSONObject>>(entities,HttpStatus.OK);
                //repo.findAll();
    }
}