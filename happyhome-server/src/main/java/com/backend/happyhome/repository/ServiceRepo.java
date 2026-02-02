package com.backend.happyhome.repository;

import java.util.List;
import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.happyhome.entities.HouseholdService;
import com.backend.happyhome.entities.enums.Category;

public interface ServiceRepo extends JpaRepository<HouseholdService, Long> {

	HouseholdService findByCategoryAndServiceName(Category category, String serviceName);
	
	List<HouseholdService> findByServiceNameIn(Set<String> serviceNames);
	
}
