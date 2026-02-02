package com.backend.happyhome.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.happyhome.entities.ConsumerReview;

public interface ConsumerReviewRepo extends JpaRepository<ConsumerReview, Long> {

	ConsumerReview findByMyOrderOrderId(Long oid);
	
}
