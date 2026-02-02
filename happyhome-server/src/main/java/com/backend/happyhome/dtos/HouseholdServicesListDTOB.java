package com.backend.happyhome.dtos;

import java.util.List;

import com.backend.happyhome.entities.ServiceImage;
import com.backend.happyhome.entities.enums.Category;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@AllArgsConstructor
@Data
public class HouseholdServicesListDTOB {

	private Long serviceID;
	String serviceName;
	private String shortDesc;
	private Double price;
	private Category category;
	private Double rating;
	private List<byte[]> serviceImages;
	
}
