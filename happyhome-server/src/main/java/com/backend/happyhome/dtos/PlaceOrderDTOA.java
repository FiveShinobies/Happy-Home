package com.backend.happyhome.dtos;

import java.time.LocalDateTime;

import com.backend.happyhome.entities.enums.Priority;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PlaceOrderDTOA {

	@NotNull
	private Long consumerId;
	
	@NotNull
	private Long serviceId;	
	
	@NotNull
	private LocalDateTime timeSlot;
	
	@NotNull
	private Long addressId;
	
	@NotNull
	private Double orderPrice;
	
	private Priority priority = Priority.NORMAL;
	
}
