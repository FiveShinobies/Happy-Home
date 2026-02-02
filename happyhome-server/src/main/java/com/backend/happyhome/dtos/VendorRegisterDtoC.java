package com.backend.happyhome.dtos;

import java.time.LocalDate;
import java.util.List;


import lombok.Data;

@Data
public class VendorRegisterDtoC {

	private String firstName;
	private String lastName;
	private String email;
	private String password;
	private String phone;
	private LocalDate dob;
	private AddressDto address;
	private String aadhardNo;
	private String panNo;
	private int experience;
	private List<ServiceDtoC> services;
}
