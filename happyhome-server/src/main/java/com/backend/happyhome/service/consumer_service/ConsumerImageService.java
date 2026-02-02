package com.backend.happyhome.service.consumer_service;

import java.util.Optional;

import com.backend.happyhome.entities.Consumer;

public interface ConsumerImageService {
	Optional<Consumer> findByConsumerId(Long consumerId);

}

