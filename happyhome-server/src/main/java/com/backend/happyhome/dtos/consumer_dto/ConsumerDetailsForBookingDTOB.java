package com.backend.happyhome.dtos.consumer_dto;

import java.util.List;

import com.backend.happyhome.dtos.ConsumerAddressDetailsDTOB;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@AllArgsConstructor
@RequiredArgsConstructor
public class ConsumerDetailsForBookingDTOB {

	private ConsumerDetailsDTOB consumer;
	
	private List<ConsumerAddressDetailsDTOB> addresses;
	
	private HouseholdServiceDtoA service;
	
}
