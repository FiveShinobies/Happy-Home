package com.backend.happyhome.controller;


import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.happyhome.dto.OrderDTO;
import com.backend.happyhome.dtos.AddressDto;
import com.backend.happyhome.dtos.ConsumerDtoC;
import com.backend.happyhome.dtos.consumer_dto.EditConsumerProfileRequestD;
import com.backend.happyhome.entities.Order;
import com.backend.happyhome.service.ConsumerService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/consumer")
@RequiredArgsConstructor
public class ConsumerController {

	private final ConsumerService consumerService;
	
	@PostMapping("/add-address/{cid}")
	ResponseEntity<String> addAddress(@PathVariable Long cid , @RequestBody AddressDto ad){
		
		consumerService.addAddress(cid, ad);
		
		return ResponseEntity.ok("address added successfully");
	}
	
	@PutMapping("/edit-address/{aid}")
	ResponseEntity<String> editAddress(@PathVariable Long aid , @RequestBody AddressDto ad){
		
		consumerService.editAddress(aid, ad);
		
		return ResponseEntity.ok("address edited successfully");
	}
	
	@DeleteMapping("/delete-address/{aid}")
	ResponseEntity<String> deleteAddress(@PathVariable Long aid){
		
		consumerService.deleteAddress(aid);
		
		return ResponseEntity.ok("address deleted successfully");
	}
		
	// to be re written
	@PutMapping("/edit/{id}")
	ResponseEntity<EditConsumerProfileRequestD> editConsumerDetails(@RequestBody @Valid EditConsumerProfileRequestD consumer,@PathVariable Long id){
		return new ResponseEntity<>(consumerService.editConsumerDetails(consumer, id),HttpStatus.OK);
	}
	
	
	
	@GetMapping("/{id}/allOrders")
	ResponseEntity<List<OrderDTO>> getAllOrdersOfConsumer(@PathVariable Long id){
				
		List<OrderDTO> res = new ArrayList<>();
		List<Order> x = consumerService.getAllOrdersOfConsumer(id);
		
		for(Order o : x) {
			res.add(ConsumerController.mapToOrderDTO(o));
		}
		
		return new ResponseEntity<>(res,HttpStatus.OK);
	}
	
	@GetMapping("/order/{oId}")
	ResponseEntity<OrderDTO> getOrderOfConsumer(@PathVariable Long oId){
		return new ResponseEntity<>(consumerService.getOrderOfConsumer(oId),HttpStatus.OK);
	}
	
	@GetMapping("/profile/{cId}")
	public ResponseEntity<ConsumerDtoC> getConsumerProfile(@PathVariable Long cId){
		return ResponseEntity.ok(consumerService.getConsumerDetailsById(cId));	
	}

	
	
	// to map to orderDto

	public static OrderDTO mapToOrderDTO(Order order) {


	    OrderDTO dto = new OrderDTO();

	    // Order core
	    dto.setOrderId(order.getOrderId());
	    dto.setOrderDateTime(order.getOrderDateTime());
	    dto.setTimeSlot(order.getTimeSlot());
	    dto.setOrderPrice(order.getOrderPrice());
	    dto.setStatus(order.getStatus().name());
	    dto.setPriority(order.getPriority().name());

	    // Consumer
	    dto.setConsumerId(order.getMyConsumer().getConsumerId());

	    // Vendor
	    if (order.getMyVendor() != null) {
	        dto.setVendorId(order.getMyVendor().getVendorId());
	        dto.setVendorFirstName(order.getMyVendor().getMyUser().getFirstName());
	        dto.setVendorLastName(order.getMyVendor().getMyUser().getLastName());
	        dto.setVendorPhone(order.getMyVendor().getMyUser().getPhone());
	        dto.setVendorExperience(order.getMyVendor().getExperience());
	    }

	    // Service
	    dto.setServiceId(order.getMyServices().getServiceId());
	    dto.setServiceName(order.getMyServices().getServiceName());
	    dto.setServiceShortDesc(order.getMyServices().getShortDesc());
	    dto.setServicePrice(order.getMyServices().getPrice());

	    // Address
	    dto.setAddressId(order.getOrderAddress().getAddressId());
	    dto.setHomeNo(order.getOrderAddress().getHomeNo());
	    dto.setTown(order.getOrderAddress().getTown());
	    dto.setCity(order.getOrderAddress().getCity());
	    dto.setState(order.getOrderAddress().getState());
	    dto.setPincode(order.getOrderAddress().getPincode());

	    // Payment
	    if (order.getMyConsumerTransaction() != null) {
	        dto.setPaymentStatus(
	            order.getMyConsumerTransaction().getStatus().name()
	        );
	        dto.setPaymentId(
	            order.getMyConsumerTransaction().getPaymentId()
	        );
	    }

	    // Review
	    if (order.getMyConsumerReview() != null) {
	        dto.setRating(order.getMyConsumerReview().getRating());
	        dto.setReviewDescription(
	            order.getMyConsumerReview().getDescription()
	        );
	    }

	    return dto;
	}



	
	
}
