package com.backend.happyhome.exception_handler;

import java.time.LocalDateTime;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.backend.happyhome.dto.ErrorResponseDTO;

import jakarta.servlet.http.HttpServletRequest;

@ControllerAdvice
public class GlobalExceptionHandler {
	
	
	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<ErrorResponseDTO> handleValidationException(
	        MethodArgumentNotValidException ex,
	        HttpServletRequest request
	) {
	    String message = ex.getBindingResult()
	                       .getFieldErrors()
	                       .get(0)
	                       .getDefaultMessage();

	    ErrorResponseDTO error = new ErrorResponseDTO(
	            LocalDateTime.now(),
	            HttpStatus.BAD_REQUEST.value(),
	            "Validation Failed",
	            message,
	            request.getRequestURI()
	    );

	    return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
	}

	
	
	@ExceptionHandler(Exception.class)
	public ResponseEntity<ErrorResponseDTO> handleGenericException(
	        Exception ex,
	        HttpServletRequest request
	) {
	    ErrorResponseDTO error = new ErrorResponseDTO(
	            LocalDateTime.now(),
	            HttpStatus.INTERNAL_SERVER_ERROR.value(),
	            "Internal Server Error",
	            ex.getMessage(),
	            request.getRequestURI()
	    );

	    return new ResponseEntity<>(error, HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
}
