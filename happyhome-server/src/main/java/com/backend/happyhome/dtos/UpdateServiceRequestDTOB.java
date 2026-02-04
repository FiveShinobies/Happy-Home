package com.backend.happyhome.dtos;

import com.backend.happyhome.entities.enums.Category;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class UpdateServiceRequestDTOB {

	 @NotBlank(message = "Service name is required")
	    @Size(min = 3, max = 100, message = "Service name must be 3–100 characters")
	    private String serviceName;

	    @NotBlank(message = "Short description is required")
	    @Size(max = 255, message = "Short description must be under 255 characters")
	    private String shortDesc;

	    @NotBlank(message = "Long description is required")
	    @Size(min = 10, message = "Long description must be at least 10 characters")
	    private String longDesc;

	    @NotNull(message = "Price is required")
	    @Min(value = 10, message = "Price must be at least ₹10")
	    private Double price;

	    @NotNull(message = "Category is required")
	    private Category category;
}
