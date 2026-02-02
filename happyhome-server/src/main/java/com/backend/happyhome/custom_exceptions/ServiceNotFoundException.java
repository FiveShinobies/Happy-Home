package com.backend.happyhome.custom_exceptions;

public class ServiceNotFoundException extends RuntimeException {

	public ServiceNotFoundException(String message) {
		super(message);
		
	}

}
