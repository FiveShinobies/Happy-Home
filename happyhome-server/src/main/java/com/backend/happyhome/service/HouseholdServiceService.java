package com.backend.happyhome.service;

import java.util.List;


import com.backend.happyhome.dtos.HouseholdServicesListDTOB;
import com.backend.happyhome.dtos.ServiceDetailsDTOB;
import com.backend.happyhome.entities.enums.Category;

public interface HouseholdServiceService {
	
	List<HouseholdServicesListDTOB> getAllHouseholdServices();
	
	ServiceDetailsDTOB getServiceById(Long serviceId);
	
	List<Category> getCategories();

	List<String> getServicesForCategory(Category category);

}
