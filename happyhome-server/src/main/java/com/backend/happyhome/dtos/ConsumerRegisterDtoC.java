package com.backend.happyhome.dtos;

import java.time.LocalDate;

import com.backend.happyhome.entities.Address;
import com.backend.happyhome.entities.enums.UserRole;

import lombok.Data;

@Data
public class ConsumerRegisterDtoC {

	private String firstName;
	private String lastName;
	private String email;
	private String password;
	private String phone;
	private LocalDate dob;
	private AddressDto address;
//	private Address address;   ---> delete this
	
}
