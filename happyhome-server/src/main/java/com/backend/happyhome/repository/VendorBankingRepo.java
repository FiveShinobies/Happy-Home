package com.backend.happyhome.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.happyhome.entities.VendorBanking;

public interface VendorBankingRepo extends JpaRepository<VendorBanking, Long> {
	 Optional<VendorBanking> findByMyVendorVendorId(Long vendorId);
}
