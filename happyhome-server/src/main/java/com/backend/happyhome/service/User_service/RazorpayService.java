package com.backend.happyhome.service.User_service;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.razorpay.Order;
import com.razorpay.Payment;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;

import lombok.Data;

@Service
@Data
public class RazorpayService {

	@Value("${razorpay.key.id}")
	private String apiKey;
	
	@Value("${razorpay.key.secret}")
	private String apiSecret;
	
	
	public Order createOrder(double amount, String currency, String receipt)
            throws RazorpayException {

        RazorpayClient client = new RazorpayClient(apiKey, apiSecret);

        JSONObject jsonObj = new JSONObject();
        jsonObj.put("amount", amount * 100);
        jsonObj.put("currency", currency);
        jsonObj.put("receipt", receipt);

        return client.orders.create(jsonObj);
    }
	
	
	public Double paymentAmount(String pid) throws RazorpayException {
		
		 RazorpayClient client = new RazorpayClient(apiKey, apiSecret);
		
		 Payment payment = client.payments
			        .fetch(pid);
		 
		 int amountInPaise = payment.get("amount");
		 
		 return (amountInPaise/100.0);
	}
	
	
}
