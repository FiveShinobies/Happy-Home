package com.backend.happyhome.dtos;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
public class VendorFeedbackRequestDTOE {
	
	private Long orderId;
	
	
	private int rating;
	private String comments;

}
