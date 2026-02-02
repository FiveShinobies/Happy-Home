package com.backend.happyhome.repository.vendor_repos;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.happyhome.entities.Vendor;

public interface VendorRepository extends JpaRepository<Vendor, Long> {
	Optional<Vendor> findByVendorId(Long vendorId);
 
}
