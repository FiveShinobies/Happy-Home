package com.backend.happyhome.service;

import com.backend.happyhome.dtos.consumer_dto.ConsumerDetailsForBookingDTOB;

public interface ConsumerDetailsService {
	ConsumerDetailsForBookingDTOB consumerDetailsforBookingById(Long cid);
	
}
