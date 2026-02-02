package com.backend.happyhome.dtos.vendor_dto;

import java.util.List;

import com.backend.happyhome.dto.OrderDTO;

import lombok.Data;

@Data
public class VendorDashboardDTOA {

	private List<OrderDTO> order;
	
	private Double balance;
		
}
	