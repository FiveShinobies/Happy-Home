package com.backend.happyhome.service;

public interface NotificationService {
	
	public void sendEmail(String to, String subject, String message);

}
