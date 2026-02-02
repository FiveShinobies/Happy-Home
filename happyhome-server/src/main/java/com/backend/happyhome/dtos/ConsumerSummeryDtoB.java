package com.backend.happyhome.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ConsumerSummeryDtoB {
	
	private Long consumerId;
	private String name;
	private String email;
	private String location;

}
