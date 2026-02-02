package com.backend.happyhome.service;

import org.springframework.stereotype.Service;

import com.backend.happyhome.custom_exceptions.ApiException;
import com.backend.happyhome.custom_exceptions.ResourceNotFoundException;
import com.backend.happyhome.dtos.VendorFeedbackRequestDTOE;
import com.backend.happyhome.entities.Order;
import com.backend.happyhome.entities.VendorReview;
import com.backend.happyhome.entities.enums.Status;
import com.backend.happyhome.repository.OrderRepo;
import com.backend.happyhome.repository.VendorReviewRepo;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class VendorReviewServiceImpl implements VendorReviewService {
	
	private final OrderRepo orderRepository;
	private final VendorReviewRepo vendorReviewRepository;

	@Override
	public void giveFeedback(VendorFeedbackRequestDTOE request) {
		
		Order order = orderRepository.findById(request.getOrderId())
				.orElseThrow(() -> new ResourceNotFoundException("Invalid Order Id"));
		
		if(!order.getStatus().equals(Status.COMPLETED)) {
			throw new ApiException("Feedback can be submitted only after order completion");
		}
		
		if(vendorReviewRepository.existsByMyOrderOrderId(request.getOrderId())) {
			throw new ApiException("Vendor Feedback Already submitted for this order");
		}
		
		VendorReview review = new VendorReview();
		review.setMyOrder(order);
		review.setRating(request.getRating());
		review.setDescription(request.getComments());
		
		VendorReview savedReview = vendorReviewRepository.save(review);
		
		order.setMyVendorReview(savedReview);
	}
}

