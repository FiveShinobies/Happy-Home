package com.backend.happyhome.dtos;

import java.time.LocalDate;
import java.util.List;

import com.backend.happyhome.entities.HouseholdService;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class VendorProfileResponseDTOE {

	    private String fullName;
	    private List<ServiceDtoB> servicesProvided;
	    private List<String> languages;
	    private byte[] profileImage;
	    private List<ServiceDtoB> allServices;
	    private Integer experienceYears;
	    private double rating;
	    private long totalServices;
	    private long totalReviews;

	    private String firstName;
	    private String lastName;
	    private String email;
	    private String phone;
	    private LocalDate dateOfBirth;

	    private AddressDto address;
	    
	    private String aadhaarNumber;
	    private String panNumber;
	    
	 
	}

