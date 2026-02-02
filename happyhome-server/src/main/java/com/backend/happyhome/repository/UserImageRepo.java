package com.backend.happyhome.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.happyhome.entities.UserImage;

public interface UserImageRepo extends JpaRepository<UserImage, Long> {

}
