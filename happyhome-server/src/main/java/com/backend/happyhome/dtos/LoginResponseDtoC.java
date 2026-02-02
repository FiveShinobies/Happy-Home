package com.backend.happyhome.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LoginResponseDtoC {

	private String status;
	private Long userId; 
}