package com.backend.happyhome.dtos;

import java.lang.invoke.StringConcatFactory;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ConsumerAddressDetailsDTOB {

	private Long addressId;
	private String homeNo;
	private String town;
	private String city;
	private String state;
	private String pincode;
	
}
