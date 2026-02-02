package com.backend.happyhome.custom_exceptions;

public class OrderDoesNotExistException extends RuntimeException {

	public OrderDoesNotExistException(String msg) {
		super(msg);
	}
	
}
