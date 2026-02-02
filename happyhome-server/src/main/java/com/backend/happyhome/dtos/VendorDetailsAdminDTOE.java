package com.backend.happyhome.dtos;

import java.time.LocalDate;

import lombok.Data;

@Data
public class VendorDetailsAdminDTOE {
	private Long vendorId;
	private String name;
	private String email;
	private String phone;
	private String city;
	private String address;
	private Double rating;
	private LocalDate joinDate;
}
