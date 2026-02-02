package com.backend.happyhome.dtos;

import java.time.LocalDateTime;

import com.backend.happyhome.entities.Address;
import com.backend.happyhome.entities.HouseholdService;
import com.backend.happyhome.entities.Vendor;
import com.backend.happyhome.entities.enums.Priority;

import lombok.Data;

@Data
public class OrderDtoC {

	private double price;
	private LocalDateTime timeSlot;
	private Address address;
	private HouseholdService service; 
	private Vendor myVendor;
	private Priority priority;

}



