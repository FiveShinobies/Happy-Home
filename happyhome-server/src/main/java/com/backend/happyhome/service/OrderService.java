package com.backend.happyhome.service;

import java.time.LocalDateTime;
import java.util.List;

import com.backend.happyhome.dto.OrderDTO;
import com.backend.happyhome.dtos.ConsumerReviewDTOA;
import com.backend.happyhome.dtos.OrderDtoD;
import com.backend.happyhome.dtos.PlaceOrderDTOA;
import com.backend.happyhome.entities.Address;
import com.backend.happyhome.entities.Consumer;
import com.backend.happyhome.entities.ConsumerReview;
import com.backend.happyhome.entities.Order;

public interface OrderService {

	List<OrderDtoD> getIncomingOrderRequest();
	OrderDTO getOngoingOrders(Long oId);
	Address getAddress(Long oID);
	Consumer getConsumer(Long oId);
	boolean updateStatusToInProgress(Long oId);
	boolean updateStatusToCompleted(Long oId);
 
	List<Order> getOrdersByConsumerId(Long cid);
	
	Order getOrderDetailsById(Long oid);
	
	Order changeTimeSlot(Long oid , LocalDateTime updatedTime);
	
	ConsumerReview addConsumerReviewForAnOrder(Long oid , ConsumerReviewDTOA cr);
	
	Order addOrder(PlaceOrderDTOA newOrder);

	List<Order> getAllOrders();
	
}
