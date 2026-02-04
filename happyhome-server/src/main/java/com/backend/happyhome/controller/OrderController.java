package com.backend.happyhome.controller;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.backend.happyhome.dto.OrderDTO;
import com.backend.happyhome.dtos.ConsumerReviewDTOA;
import com.backend.happyhome.entities.Order;
import com.backend.happyhome.service.OrderService;
import com.backend.happyhome.service.VendorService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/order")
public class OrderController {
	
	private final OrderService orderService;
	private final VendorService vendorService;
	
	
	@PatchMapping("/in-progress/{oid}")
	public ResponseEntity<String> updateStatusToInProgresss(@PathVariable Long oid){
		
		orderService.updateStatusToInProgress(oid);
		
		return ResponseEntity.ok("Status updated to InProgress");
	}
	
	@PatchMapping("/completed/{oid}")
	public ResponseEntity<String> updateStatusToCompleted(@PathVariable Long oid){
		
		orderService.updateStatusToCompleted(oid);
		
		vendorService.payVendor(oid);
		 
		return ResponseEntity.ok("Status updated to Completed and money added to vendor wallet");
	}

	@PatchMapping("/change-timeslot/{oId}")
	public ResponseEntity<?> changeTimeSlot(@PathVariable Long oId , @RequestBody LocalDateTime newTime){
		
		return ResponseEntity.ok(orderService.changeTimeSlot(oId, newTime));
	}
	
	@PostMapping("/add-consumer-review")
	public ResponseEntity<?> addConsumerReview(Long oid, ConsumerReviewDTOA cr) {
		return ResponseEntity.ok(orderService.addConsumerReviewForAnOrder(oid, cr));
	}
	
	@GetMapping("/{oId}")
	public ResponseEntity<?> getOrderDetails(@PathVariable Long oId){
		Order o = orderService.getOrderDetailsById(oId);
		return ResponseEntity.ok(ConsumerController.mapToOrderDTO(o)); 
	}
	
	@GetMapping
	public ResponseEntity<?> getAllOrder(){
		
		List<OrderDTO> res = new ArrayList<>();
		List<Order> x = orderService.getAllOrders();
		
		for(Order o : x) {
			res.add(ConsumerController.mapToOrderDTO(o));
		}
		
		return new ResponseEntity<>(res,HttpStatus.OK);
	}
	
}
