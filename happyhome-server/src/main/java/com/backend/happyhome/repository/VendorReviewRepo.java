package com.backend.happyhome.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.backend.happyhome.entities.VendorReview;
import org.springframework.stereotype.Repository;

@Repository
public interface VendorReviewRepo extends JpaRepository<VendorReview, Long> {
	boolean existsByMyOrderOrderId(Long orderId);
	
	long countByMyOrderMyVendorVendorId(Long vendorId);

	@Query("""
	   SELECT COALESCE(AVG(vr.rating),0)
	   FROM VendorReview vr
	   WHERE vr.myOrder.myVendor.vendorId = :vendorId
	""")
	double findAverageRating(Long vendorId);

}
