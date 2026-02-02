package com.backend.happyhome.repository.vendor_repos;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.happyhome.entities.VendorTransaction;

public interface VendorTransactionRepo extends JpaRepository<VendorTransaction, Long> {

}
