package com.backend.happyhome.dtos;

import java.text.DecimalFormat;

import org.hibernate.validator.constraints.Range;

import com.backend.happyhome.entities.enums.Category;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@RequiredArgsConstructor
public class CreateServiceRequestDTOB {

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
    @Min(value = 10, message = "Price must be at least 1")
    private Double price;

    @NotNull(message = "Category is required")
    private Category category; // enum
    
    private boolean active = true;
}
