package com.backend.happyhome.service.consumer_service;

import com.backend.happyhome.dtos.consumer_dto.EditConsumerProfileRequestD;

public interface ConsumerProfileService {
    void editProfile(Long consumerId, EditConsumerProfileRequestD request) throws Exception;
}

