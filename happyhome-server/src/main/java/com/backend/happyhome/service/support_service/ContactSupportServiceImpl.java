package com.backend.happyhome.service.support_service;

import org.springframework.stereotype.Service;

import com.backend.happyhome.dtos.support_dto.ContactSupportRequest;
import com.backend.happyhome.entities.ContactSupport;
import com.backend.happyhome.repository.support_repos.ContactSupportRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class ContactSupportServiceImpl implements ContactSupportService {

    private final ContactSupportRepository contactSupportRepository;

    @Override
    public void createSupportRequest(ContactSupportRequest request) {

        ContactSupport support = new ContactSupport();
        support.setName(request.getName().trim());
        support.setEmail(request.getEmail().trim());
        support.setCategory(request.getCategory().trim());
        support.setDescription(request.getDescription().trim());

        contactSupportRepository.save(support);
    }
}
