package com.backend.happyhome.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.happyhome.entities.HouseholdService;
import com.backend.happyhome.entities.ServiceImage;

public interface ServiceImageRepo extends JpaRepository<ServiceImage, Long> {

	List<ServiceImage> findByMyService(HouseholdService service);

	void deleteByMyServiceServiceId(Long sid);

	
}
