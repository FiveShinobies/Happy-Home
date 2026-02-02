package com.backend.happyhome.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.backend.happyhome.entities.Vendor;

@Repository
public interface VendorRepo extends JpaRepository<Vendor, Long> {

	Vendor findByMyUserUserId(Long uid);
	
}
