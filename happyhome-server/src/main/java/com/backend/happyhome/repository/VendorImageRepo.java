package com.backend.happyhome.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.happyhome.entities.UserImage;

public interface VendorImageRepo extends JpaRepository<UserImage, Long> {
	Optional<UserImage> findByMyUserUserId(Long userId);
}
