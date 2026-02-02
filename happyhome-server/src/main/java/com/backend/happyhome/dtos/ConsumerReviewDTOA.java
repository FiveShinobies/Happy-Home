package com.backend.happyhome.dtos;

import com.backend.happyhome.entities.Order;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ConsumerReviewDTOA {

	private Order order;
	
	private Integer rating;
	
	private String description;
	
}
