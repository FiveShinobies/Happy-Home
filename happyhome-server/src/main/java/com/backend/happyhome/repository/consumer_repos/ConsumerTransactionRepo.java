package com.backend.happyhome.repository.consumer_repos;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.happyhome.entities.ConsumerTransaction;

public interface ConsumerTransactionRepo extends JpaRepository<ConsumerTransaction, Long> {

	ConsumerTransaction findByOrderIdOrderId(Long oid);
	
}
