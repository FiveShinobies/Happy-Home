package com.backend.happyhome.dtos;

import com.backend.happyhome.entities.enums.Category;

import lombok.Data;

@Data
public class ServiceDtoC {

	private Category category;
	private String serviceName;
	
}
