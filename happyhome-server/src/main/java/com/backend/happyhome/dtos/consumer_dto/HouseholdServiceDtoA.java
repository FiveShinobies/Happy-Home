package com.backend.happyhome.dtos.consumer_dto;

import com.backend.happyhome.entities.enums.Category;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class HouseholdServiceDtoA {

    private Long serviceId;

    private String serviceName;

    private String shortDesc;

    private String longDesc;

    private Double price;

    private Category category;

    private boolean active;
}
