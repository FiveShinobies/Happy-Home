package com.backend.happyhome.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
@AllArgsConstructor
public class ServiceReviewDTOB {

	Integer rating;
	String review;
	
}
