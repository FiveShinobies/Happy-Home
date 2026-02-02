package com.backend.happyhome.repository.vendor_repos;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.happyhome.entities.Vendor;
import com.backend.happyhome.entities.VendorWallet;

public interface VendorWalletRepo extends JpaRepository<VendorWallet, Long> {
	
	VendorWallet findByMyVendorVendorId(Long vid);
	
}
