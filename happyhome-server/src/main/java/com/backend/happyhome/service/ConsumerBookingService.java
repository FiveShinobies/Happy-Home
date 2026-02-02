package com.backend.happyhome.service;

import com.backend.happyhome.dtos.consumer_dto.ConsumerDetailsForBookingDTOB;

public interface ConsumerBookingService {

	ConsumerDetailsForBookingDTOB getConsumerDetailsForBooking(Long cid , Long sId);
	
}
