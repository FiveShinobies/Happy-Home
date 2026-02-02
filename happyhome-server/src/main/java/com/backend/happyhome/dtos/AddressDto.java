package com.backend.happyhome.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@AllArgsConstructor
@RequiredArgsConstructor
public class AddressDto {
	
	private Long addressId;
	private String homeNo;
    private String town;
    private String city;
    private String state;
    private String pincode;
}
