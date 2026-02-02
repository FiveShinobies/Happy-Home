package com.backend.happyhome.service;

import java.util.List;

import com.backend.happyhome.dto.OrderDTO;
import com.backend.happyhome.dtos.AddressDto;
import com.backend.happyhome.dtos.ConsumerDtoC;
import com.backend.happyhome.dtos.ConsumerSummeryDtoB;
import com.backend.happyhome.dtos.consumer_dto.EditConsumerProfileRequestD;
import com.backend.happyhome.entities.Order;

public interface ConsumerService {

	List<ConsumerSummeryDtoB> getAllConsumerForAdmin();
	List<ConsumerDtoC> getAllConsumers();
	ConsumerDtoC getConsumerDetailsById(Long cId);
	List<Order> getAllOrdersOfConsumer(Long cId);
	OrderDTO getOrderOfConsumer(Long oId);

	boolean addAddress(Long cid , AddressDto ad);
	boolean editAddress(Long aid , AddressDto ad);
	boolean deleteAddress(Long aid);
	

	EditConsumerProfileRequestD editConsumerDetails(EditConsumerProfileRequestD dto, Long cId);

}


