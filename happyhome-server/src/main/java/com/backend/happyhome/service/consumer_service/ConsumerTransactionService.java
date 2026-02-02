package com.backend.happyhome.service.consumer_service;

import com.backend.happyhome.entities.ConsumerTransaction;
import com.backend.happyhome.entities.Order;

public interface ConsumerTransactionService {

	Order addTrasaction(ConsumerTransaction newTran);
	
}
