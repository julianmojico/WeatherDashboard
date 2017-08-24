/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.agilisys.weatherdashboard;

import com.mongodb.Mongo;
import com.mongodb.MongoClient;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.config.AbstractMongoConfiguration;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

/**
 *
 * @author Julian
 */
@Configuration
@SpringBootApplication
@EnableMongoRepositories

class ApplicationConfig extends AbstractMongoConfiguration {

  @Override
  protected String getDatabaseName() {
    return "local";
  }

  @Override
  public Mongo mongo() throws Exception {
    //return new MongoClient("192.168.99.100",32768);
    return new MongoClient("127.0.0.1",27017);
  }

  @Override
  protected String getMappingBasePackage() {
    return "com.agilisys.weatherdashboard";
  }
}