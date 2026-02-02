package com.backend.happyhome.dtos;

import com.backend.happyhome.entities.enums.Category;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ServiceDetailsForEditDTOB {

	 	private Long serviceId;
	    private String serviceName;
	    private String shortDesc;
	    private String longDesc;
	    private Double price;
	    private Category category;

}
