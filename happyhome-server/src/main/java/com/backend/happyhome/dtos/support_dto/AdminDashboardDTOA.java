package com.backend.happyhome.dtos.support_dto;

import java.util.List;

import com.backend.happyhome.dto.OrderDTO;
import com.backend.happyhome.dtos.user_dto.UserDTOA;

import lombok.Data;

@Data
public class AdminDashboardDTOA {

	private List<OrderDTO> orders;
	
	private List<UserDTOA> users;
	
}
