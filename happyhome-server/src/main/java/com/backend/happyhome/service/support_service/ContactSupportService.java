package com.backend.happyhome.service.support_service;

import com.backend.happyhome.dtos.support_dto.ContactSupportRequest;

public interface ContactSupportService {
    void createSupportRequest(ContactSupportRequest request);
}
