package com.backend.happyhome.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.happyhome.entities.Address;
import com.backend.happyhome.entities.Vendor;

public interface VendorAddressRepo extends JpaRepository<Address, Long> {
	Optional<Address> findByMyUserUserId(Long long1);
}
