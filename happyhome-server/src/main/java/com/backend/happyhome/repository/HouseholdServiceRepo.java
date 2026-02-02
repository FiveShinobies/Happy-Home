package com.backend.happyhome.repository;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.happyhome.entities.ConsumerReview;
import com.backend.happyhome.entities.HouseholdService;
import com.backend.happyhome.entities.enums.Category;

public interface HouseholdServiceRepo extends JpaRepository<HouseholdService, Long> {

	List<HouseholdService> findByActiveTrue();
	
	Optional<HouseholdService> findByServiceIdAndActiveTrue(Long serviceId);

	List<HouseholdService> findByCategoryIsNotNull();

	List<HouseholdService> findByCategory(Category category);
}
