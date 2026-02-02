package com.backend.happyhome.custom_exceptions;

public class CannotChangeTimeSlotException extends RuntimeException {

	public CannotChangeTimeSlotException(String msg) {
		super(msg);
	}
	
}
