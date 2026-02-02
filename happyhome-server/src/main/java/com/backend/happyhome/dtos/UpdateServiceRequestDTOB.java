package com.backend.happyhome.dtos;

import com.backend.happyhome.entities.enums.Category;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

@Data
public class UpdateServiceRequestDTOB {

	@NotBlank(message = "Service name is required")
	private String serviceName;

	@NotBlank(message = "Short description is required")
	private String shortDesc;

	@NotBlank(message = "Long description is required")
	private String longDesc;

	@NotNull(message = "Price is required")
	@Positive(message = "Price must be greater than zero")
	private Double price;

	@NotNull(message = "Category is required")
	private Category category;
}
