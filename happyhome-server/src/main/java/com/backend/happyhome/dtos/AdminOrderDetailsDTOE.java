package com.backend.happyhome.dtos;

import java.time.LocalDateTime;

import com.backend.happyhome.entities.enums.Status;

import lombok.Data;

@Data
public class AdminOrderDetailsDTOE {
	private Long orderId;
	private LocalDateTime orderDate;
	private String name;
	private Double total;
	private Status status;
}
