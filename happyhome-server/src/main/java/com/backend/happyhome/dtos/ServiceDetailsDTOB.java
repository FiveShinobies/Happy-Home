package com.backend.happyhome.dtos;

import java.util.List;

import com.backend.happyhome.entities.enums.Category;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@AllArgsConstructor
@Data
public class ServiceDetailsDTOB {

	Long serviceId;
	String serviceName;
	String shortDesc;
	String longDesc;
	Double price;
	Category category;
	List<byte[]> images;
	Double avgRating;
	List<ServiceReviewDTOB> reviews;
}
