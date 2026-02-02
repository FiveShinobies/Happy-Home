package com.backend.happyhome.service.consumer_service;

import org.springframework.stereotype.Service;

import com.backend.happyhome.audit.AuditAction;
import com.backend.happyhome.audit.annotation.Audit;
import com.backend.happyhome.entities.ConsumerTransaction;
import com.backend.happyhome.entities.Order;
import com.backend.happyhome.repository.OrderRepo;
import com.backend.happyhome.repository.consumer_repos.ConsumerTransactionRepo;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class ConsumerTransactionServiceImpl implements ConsumerTransactionService {

	private final ConsumerTransactionRepo ctRepo;
	
	private final OrderRepo orderRepo;
	
	@Override
	@Audit(action = AuditAction.PAYMENT_INITIATED)
	public Order addTrasaction(ConsumerTransaction newTran) {
		
		ConsumerTransaction savedCt = ctRepo.save(newTran);
		Order o = orderRepo.findById(savedCt.getOrderId().getOrderId()).orElseThrow();
		o.setMyConsumerTransaction(savedCt);
		
		return orderRepo.save(o);
	}

}
