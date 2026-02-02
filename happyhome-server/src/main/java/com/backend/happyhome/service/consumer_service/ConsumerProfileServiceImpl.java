package com.backend.happyhome.service.consumer_service;

import javax.management.AttributeNotFoundException;

import org.springframework.stereotype.Service;

import com.backend.happyhome.dtos.consumer_dto.EditConsumerProfileRequestD;
import com.backend.happyhome.entities.Consumer;
import com.backend.happyhome.entities.User;
import com.backend.happyhome.repository.consumer_repos.ConsumerRepository;
import com.backend.happyhome.repository.user_repos.UserRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Transactional
@Service
@RequiredArgsConstructor
public class ConsumerProfileServiceImpl implements ConsumerProfileService {

    private final ConsumerRepository consumerRepository;
    private final UserRepository userRepository;

    @Override
    public void editProfile(Long consumerId, EditConsumerProfileRequestD request) throws Exception {

        Consumer consumer = consumerRepository.findById(consumerId)
            .orElseThrow(() -> new AttributeNotFoundException("Consumer not found"));
        
        User user = consumer.getMyUser();
 
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setEmail(request.getEmail());
        user.setPhone(request.getPhoneNumber());

        userRepository.save(user);
    }
}
