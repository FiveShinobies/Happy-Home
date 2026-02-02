package com.backend.happyhome.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.happyhome.dto.OrderDTO;
import com.backend.happyhome.dtos.OrderDtoD;
import com.backend.happyhome.dtos.VendorAddressResponseDTOE;
import com.backend.happyhome.dtos.VendorBankingResponseDTOE;
import com.backend.happyhome.dtos.VendorEditProfileRequestDTOE;
import com.backend.happyhome.dtos.VendorFeedbackRequestDTOE;
import com.backend.happyhome.dtos.VendorProfileResponseDTOE;
import com.backend.happyhome.dtos.vendor_dto.VendorWalletDTOA;
import com.backend.happyhome.entities.Address;
import com.backend.happyhome.service.OrderService;
import com.backend.happyhome.service.VendorAddressService;
import com.backend.happyhome.service.VendorBankingService;
import com.backend.happyhome.service.VendorDetailsService;
import com.backend.happyhome.service.VendorEditProfileService;
import com.backend.happyhome.service.VendorReviewService;
import com.backend.happyhome.service.VendorService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/vendor")
@RequiredArgsConstructor
public class VendorController {
  
	private final VendorAddressService vendorAddressService;
	private final OrderService orderService;
	private final VendorService vendorService;
  	private final VendorDetailsService vendorDetailsService;
    private final VendorEditProfileService vendorEditProfileService;
    private final VendorBankingService vendorBankingService;
    private final VendorReviewService vendorReviewService;
	
	
	@GetMapping("/details/{oId}")
	ResponseEntity<OrderDTO> getOngoingOrderDetails(@PathVariable Long oId){
		System.out.println(oId);
		return new ResponseEntity<>(orderService.getOngoingOrders(oId),HttpStatus.OK);
	}
	
	@GetMapping("/{oId}/orderaddress")
	ResponseEntity<Address> getAddressOfOrder(@PathVariable Long oId){
		return new ResponseEntity<>(vendorService.getAddressOfOrder(oId),HttpStatus.OK);
	}
	  	
    //  Get Vendor Profile 
    @GetMapping("/{vendorId}/profile")
    public ResponseEntity<VendorProfileResponseDTOE> getVendorProfile(
            @PathVariable Long vendorId) {

        return ResponseEntity.ok(
                vendorDetailsService.getVendorDetails(vendorId)
        );
    }

    //  Get Vendor Address
    @GetMapping("/{vendorId}/address")
    public ResponseEntity<VendorAddressResponseDTOE> getVendorAddress(
            @PathVariable Long vendorId) {

        return ResponseEntity.ok(
                vendorAddressService.getVendorAddress(vendorId)
        );
    }

    //  Get Vendor Banking Details
    @GetMapping("/{vendorId}/banking")
    public ResponseEntity<VendorBankingResponseDTOE> getVendorBankingDetails(
            @PathVariable Long vendorId) {

        return ResponseEntity.ok(
                vendorBankingService.getVendorBankingDetails(vendorId)
        );
    }

    //  Edit Vendor Profile (PATCH)
    @PutMapping("/{vendorId}/profile")
    public ResponseEntity<String> editVendorProfile(
            @PathVariable Long vendorId,
            @RequestBody VendorEditProfileRequestDTOE request) {
    	
    	
    	
        vendorEditProfileService.editProfile(vendorId, request);
        return ResponseEntity.ok("Vendor profile updated successfully");
    }

    //  Give feedback to consumer 
    @PostMapping("/orders/{orderId}/feedback")
    public ResponseEntity<String> giveFeedbackToConsumer(
            @PathVariable Long orderId,
            @RequestBody VendorFeedbackRequestDTOE request) {

        request.setOrderId(orderId);

//        vendorReviewService.giveFeedback(request);

        return ResponseEntity.ok("Feedback submitted successfully");
    }

	
  	    
	    @GetMapping("/work")
	    public ResponseEntity<List<OrderDtoD>> sendWorkNOtification(){

	    	List<OrderDtoD> luo =  orderService.getIncomingOrderRequest();
	    	
	    	return ResponseEntity.ok(luo);
	    }
	    
	    @PostMapping("/work/{vId}/{oId}")
	    public ResponseEntity<?> acceptWork(@PathVariable Long vId , @PathVariable Long oId){
	    	System.out.println(vId + "---" + oId);
	    	boolean hasBeenAccepted = vendorService.acceptRequest(oId, vId);
			if(hasBeenAccepted) {
				return new ResponseEntity<>("Request Accepted", HttpStatus.ACCEPTED);
			}else {
				return new ResponseEntity<>("Request Not Accepted", HttpStatus.NOT_ACCEPTABLE);
			}
	    }
	    
	    
	    @GetMapping("/wallet-balance/{vid}")
	    public ResponseEntity<?> getWalletBalance(@PathVariable Long vid) {
	    	
	    	VendorWalletDTOA v =  new VendorWalletDTOA();
	    	v.setBalance(vendorService.getWallet(vid).getBalance()) ;
	  
	    	return ResponseEntity.ok(v);
	    	
	    }
	    
	    @GetMapping("/dashboard/{vid}")
	    public ResponseEntity<?> getDashboard(@PathVariable Long vid){
	    	System.out.println(vid);
	    	return ResponseEntity.ok(vendorService.dashboardData(vid));
	    }
	    
	    
}

