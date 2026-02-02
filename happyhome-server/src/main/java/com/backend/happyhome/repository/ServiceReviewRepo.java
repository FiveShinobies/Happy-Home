package com.backend.happyhome.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.happyhome.entities.ConsumerReview;
import com.backend.happyhome.entities.Order;


public interface ServiceReviewRepo extends JpaRepository<ConsumerReview, Long> {

	//get all reviews of a service via order
	
	List<ConsumerReview> findByMyOrder(Order order);

	List<ConsumerReview> findByMyOrder_MyServices_ServiceId(Long serviceId);
}
