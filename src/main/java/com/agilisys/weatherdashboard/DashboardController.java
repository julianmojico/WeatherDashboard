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
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class DashboardController {

    @Autowired
    private DashboardRepo repoDash;


    //get Dashboard by Id (name)
     @RequestMapping(method = RequestMethod.GET, value = "/dashboards/{id}")
    
    public @ResponseBody Dashboard getDashboard(@Validated @PathVariable("id") String id) {
        return repoDash.findOne(id);
    }
    
    //add new dashboard
    @RequestMapping(method = RequestMethod.POST, value = "/dashboards/update",produces = "application/json",consumes = MediaType.ALL_VALUE)
    @ResponseBody
    @ResponseStatus(HttpStatus.CREATED)
    public Dashboard postDashboard(@RequestBody Dashboard db) {
        
        //repo.insert(db);
        //        if (!repoDash.exists(db.getName())) {
        repoDash.save(db);
        return db;
    }
    
    //get full list of  Dashboards
    @RequestMapping(method = RequestMethod.GET, value = "/dashboards")
    
    public  @ResponseBody Object[] getAllDashboards() {
       
        /*
        StringBuilder sb = new StringBuilder();
        ArrayList dashboards = (ArrayList) repoDash.findAll();
        dashboards.forEach((dashboard)->sb.append(dashboard.toString()));
        return sb.toString(); */
        
        return repoDash.findAll().toArray();
// return new ResponseEntity<List<JSONObject>>(entities,HttpStatus.OK);
                //repo.findAll();
    }
    
        public void updateWeather(Dashboard dash, String queryResult) {
            dash.setQuery(queryResult);
            repoDash.save(dash);
          
      }
}