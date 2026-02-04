package com.backend.happyhome.controller;

import java.time.LocalDateTime;
import java.util.Map;

import org.apache.commons.codec.digest.HmacUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.backend.happyhome.dtos.PlaceOrderDTOA;
import com.backend.happyhome.dtos.RazorpayPaymentDTOA;
import com.backend.happyhome.dtos.consumer_dto.VerifyPaymentRequestDTO;
import com.backend.happyhome.entities.ConsumerTransaction;
import com.backend.happyhome.entities.enums.TransactionStatus;
import com.backend.happyhome.service.NotificationService;
import com.backend.happyhome.service.OrderServiceImpl;
import com.backend.happyhome.service.User_service.RazorpayService;
import com.backend.happyhome.service.consumer_service.ConsumerTransactionServiceImpl;
import com.razorpay.Order;
import com.razorpay.RazorpayException;

import lombok.RequiredArgsConstructor;


@RestController
@RequiredArgsConstructor
@RequestMapping("/payments")
public class PaymentController {

	private final RazorpayService rpService;
	
	private final OrderServiceImpl orderService;
	
	private final ConsumerTransactionServiceImpl ctService;
	
	private final NotificationService notificationService;
	
	@PostMapping("/create-order")
	public ResponseEntity<Map<String , Object>> createOrder(@RequestParam double amount, @RequestParam String currency , @RequestParam Long cid ) throws RazorpayException 
	{
		
	    Order order = rpService.createOrder(amount, currency, Long.toString(cid));
	    
	    return ResponseEntity.ok(order.toJson().toMap()); 
	}	

	//if verification successfull - place the order -- Response To be Decided
	@PostMapping("/verify")
	
	public ResponseEntity<?> verifyPayment( @RequestBody VerifyPaymentRequestDTO verifyAndOrderRes) throws RazorpayException {
	
		RazorpayPaymentDTOA razorpayResponse = verifyAndOrderRes.getPayment();
		PlaceOrderDTOA newOrder = verifyAndOrderRes.getOrder();
		
		newOrder.setOrderPrice(rpService.paymentAmount(razorpayResponse.getRazorpayPaymentId()));
		
		System.out.println("Order price : " + newOrder.getOrderPrice());
		System.out.println("Order ID    : " + razorpayResponse.getRazorpayOrderId());
		System.out.println("Payment ID  : " + razorpayResponse.getRazorpayPaymentId());
		System.out.println("Signature   : " + razorpayResponse.getRazorpaySignature());
		
		String data = 	razorpayResponse.getRazorpayOrderId() + "|" + razorpayResponse.getRazorpayPaymentId();
		
		String genSig = new HmacUtils("HmacSHA256" , rpService.getApiSecret()).hmacHex(data) ;
		
		if(genSig.equals(razorpayResponse.getRazorpaySignature())) {
			System.out.println("Verification successfull");			
			 com.backend.happyhome.entities.Order odr = orderService.addOrder(newOrder);
			 	
			 
			 
			 ConsumerTransaction ct = new ConsumerTransaction();
			 ct.setOrderId(odr);
			 ct.setPaymentId(razorpayResponse.getRazorpayPaymentId());
			 ct.setAmount(odr.getOrderPrice());
			 ct.setStatus(TransactionStatus.SUCCESS);
			 ct.setTimestamp(LocalDateTime.now());
			
			 com.backend.happyhome.entities.Order odrU = ctService.addTrasaction(ct);
			 
			 String subject = "Payment Successful – Your Order Has Been Confirmed";

			 String message =
			         "Hi,\n\n" +
			         "Your payment has been successfully verified and your order has been placed.\n\n" +
			         "Order Details:\n" +
			         "Order ID: " + razorpayResponse.getRazorpayOrderId() + "\n" +
			         "Payment ID: " + razorpayResponse.getRazorpayPaymentId() + "\n" +
			         "Amount Paid: ₹" + newOrder.getOrderPrice() + "\n\n" +
			         "Thank you for shopping with HappyHome.\n" +
			         "We are processing your order and will notify you once it is shipped.\n\n" +
			         "Regards,\n" +
			         "HappyHome Team";
			 
			 notificationService.sendEmail(odrU.getMyConsumer().getMyUser().getEmail(), subject , message);
			 
			 return ResponseEntity.ok("order placed successfully");
			 
			 
		}else {
			System.out.println("Verification failed");
			return ResponseEntity.badRequest().body("order cannot be placed");
		}
		
	}
	
	
}



//Order ID    : order_S7hcjrtCxYpQ8q
//Payment ID  : pay_S7hdRaUVKRq5Kg
//Signature   : 11c49187519c6aa29668b1f96b118612c068c1375a6397daac85dfa0a1d61f19
//Verification successfull
