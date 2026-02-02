package com.backend.happyhome.service.User_service;

import java.io.IOException;

import javax.management.AttributeNotFoundException;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.backend.happyhome.entities.Consumer;
import com.backend.happyhome.entities.User;
import com.backend.happyhome.entities.UserImage;
import com.backend.happyhome.entities.Vendor;
import com.backend.happyhome.repository.consumer_repos.ConsumerRepository;
import com.backend.happyhome.repository.user_repos.UserImageRepository;
import com.backend.happyhome.repository.vendor_repos.VendorRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class UserImageService {

    private final ConsumerRepository consumerRepository;
    private final VendorRepository vendorRepository;
    private final UserImageRepository userImageRepository;

    public void updateUserImageByRole(
            Long refId,
            String role,
            MultipartFile image
    ) throws Exception {
        if (image.isEmpty()) {
            throw new Exception("Image is required");
        }

        if (!image.getContentType().startsWith("image/")) {
            throw new Exception("Only image files allowed");
        }

        User user;

        if ("CONSUMER".equalsIgnoreCase(role)) {
            Consumer consumer = consumerRepository.findById(refId)
                .orElseThrow(() -> new AttributeNotFoundException("Consumer not found"));
            user = consumer.getMyUser();

        } else if ("VENDOR".equalsIgnoreCase(role)) {
            Vendor vendor = vendorRepository.findByVendorId(refId)
                .orElseThrow(() -> new AttributeNotFoundException("Vendor not found"));
            user = vendor.getMyUser();

        } else {
            throw new Exception("Invalid role");
        }

        try {
            UserImage userImage = userImageRepository
                .findByMyUser(user)
                .orElse(new UserImage());

            userImage.setMyUser(user);
            userImage.setImage(image.getBytes());

            userImageRepository.save(userImage);

        } catch (IOException e) {
            throw new RuntimeException("Failed to store image");
        }
    }
}
