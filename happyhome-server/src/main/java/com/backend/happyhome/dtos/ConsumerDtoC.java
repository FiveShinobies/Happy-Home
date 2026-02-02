package com.backend.happyhome.dtos;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.backend.happyhome.entities.enums.UserStatus;

import lombok.Data;

@Data
public class ConsumerDtoC {

	private String firstName;
	private String lastName;
	private String email;
	private String phone;
	private String password;
	private LocalDate dob;
	private UserStatus userStatus;
	private Set<String> languages = new HashSet<>();
	private int rewardPoints;
	private List<AddressDto> address;
}
