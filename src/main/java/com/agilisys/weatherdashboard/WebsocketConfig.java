/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.agilisys.weatherdashboard;


import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.AbstractWebSocketMessageBrokerConfigurer;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;

@Configuration
@EnableWebSocketMessageBroker
public class WebsocketConfig extends AbstractWebSocketMessageBrokerConfigurer {

    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        config.enableSimpleBroker("/queue");  // /topic enable simple memory-based message broker on destinations prefixed /dashbordWS
        config.setApplicationDestinationPrefixes("/app"); // /app designates the "/app" prefix for messages that are bound for @MessageMapping-annotated methods.
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/locationAlt").withSockJS(); // /gs-guide-websocket
        //registers the "/locationAlt" endpoint, enabling SockJS fallback options so that alternate transports may be used if WebSocket is not available. 
        //The SockJS client will attempt to connect to "/locationRest" and use the best transport available (websocket, xhr-streaming, xhr-polling, etc).
    }

}