package com.backend.happyhome.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.happyhome.dtos.consumer_dto.ConsumerDetailsForBookingDTOB;
import com.backend.happyhome.service.ConsumerBookingService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/booking")
@RequiredArgsConstructor
public class BookingController {

	private final ConsumerBookingService consumerBookingService;
	
	
	@GetMapping("/form/{consumerId}/{serviceId}")
	public ResponseEntity<ConsumerDetailsForBookingDTOB> getBookingForm(@PathVariable Long consumerId , @PathVariable Long serviceId  ){
		
		return ResponseEntity.ok(
				consumerBookingService.getConsumerDetailsForBooking(consumerId , serviceId)
				);
		
		
	}
}

///booking/form/{consumerId}