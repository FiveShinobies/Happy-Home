package com.backend.happyhome.custom_exceptions;

public class ReviewAlreadyExistsException extends RuntimeException {

	public ReviewAlreadyExistsException (String msg){
		super(msg);
	}
	
}
