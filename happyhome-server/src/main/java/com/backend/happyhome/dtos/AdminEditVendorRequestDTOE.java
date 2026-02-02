package com.backend.happyhome.dtos;

import java.time.LocalDate;
import java.util.Set;

import com.backend.happyhome.entities.enums.UserStatus;

import lombok.Data;

@Data
public class AdminEditVendorRequestDTOE {
	
	private String firstName;
	private String lastName;
	private String email;
	private String phone;
	private LocalDate dob;
	private String password;
	private UserStatus userStatus;
	
	private String homeNo;
	private String city;
	private String state;
	private String pincode;
	
	private Set<Long> serviceIds;
	private Set<Long> languageIds;
	private Integer experience;
}
