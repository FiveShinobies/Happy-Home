package com.backend.happyhome.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.backend.happyhome.dtos.HouseholdServicesListDTOB;
import com.backend.happyhome.dtos.ServiceDetailsDTOB;
import com.backend.happyhome.entities.enums.Category;
import com.backend.happyhome.service.HouseholdServiceService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/services")
@RequiredArgsConstructor
public class HouseholdServiceController {

	private final HouseholdServiceService householdService;
	
	@GetMapping
	public ResponseEntity<List<HouseholdServicesListDTOB>> getAllServices(){
		return ResponseEntity.ok(householdService.getAllHouseholdServices());
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<ServiceDetailsDTOB> getServiceById(
			@PathVariable Long id){
		return ResponseEntity.ok(householdService.getServiceById(id));
	}
	
	@GetMapping("/categories")
	public ResponseEntity<List<Category>> getCategories(){
		return ResponseEntity.ok(householdService.getCategories());
		
	}
	
	@GetMapping("/category")
	public ResponseEntity<List<String>> getServicesForCategory(@RequestParam Category category){
		return ResponseEntity.ok(householdService.getServicesForCategory(category));
	}

}
