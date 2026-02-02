package com.backend.happyhome.dtos.consumer_dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@AllArgsConstructor
@RequiredArgsConstructor
public class ConsumerDetailsDTOB {

	private Long cid;
	private String name;
	private String email;
	private String phone;
}
