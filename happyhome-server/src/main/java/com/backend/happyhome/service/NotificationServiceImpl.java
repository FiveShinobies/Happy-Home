package com.backend.happyhome.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.backend.happyhome.custom_exceptions.UserNotPresentException;
import com.backend.happyhome.dto.NotificationRequestDto;
import com.backend.happyhome.repository.UserRepo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService {

	@Value("${notification.service.url}")
    private String notificationServiceUrl;
	
	private final RestTemplate restTemplate;
	
	
	@Override
	public void sendEmail(String to, String subject, String message) {
				
		NotificationRequestDto body = new NotificationRequestDto();
		body.setTo(to);
		body.setSubject(subject);
		body.setMessage(message);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<NotificationRequestDto> entity =
                new HttpEntity<>(body, headers);
        
        System.out.println("--------------------------------------------------------------------------------------------------------");
        System.out.println("--------------------------------------------------------------------------------------------------------");
        System.out.println("Sending notification request to Notification Service for {}" + to);
        System.out.println("--------------------------------------------------------------------------------------------------------");
        System.out.println("--------------------------------------------------------------------------------------------------------");
        try {
        	
        	ResponseEntity<String> response =
        		    restTemplate.postForEntity(
        		        notificationServiceUrl + "/api/v1/notifications",
        		        entity,
        		        String.class
        		    );

        		System.out.println("STATUS = " + response.getStatusCode());
        		System.out.println("BODY = " + response.getBody());

            System.out.println("--------------------	------------------------------------------------------------------------------------");
            System.out.println("--------------------------------------------------------------------------------------------------------");
            System.out.println("Notification REST call SUCCESS");
            System.out.println("--------------------------------------------------------------------------------------------------------");
            System.out.println("--------------------------------------------------------------------------------------------------------");
        } catch (Exception ex) {
            System.out.println("--------------------------------------------------------------------------------------------------------");
            System.out.println("--------------------------------------------------------------------------------------------------------");
        	System.out.println("Notification REST call FAILED" + ex);
            System.out.println("--------------------------------------------------------------------------------------------------------");
            System.out.println("--------------------------------------------------------------------------------------------------------");
        }
	}

}
