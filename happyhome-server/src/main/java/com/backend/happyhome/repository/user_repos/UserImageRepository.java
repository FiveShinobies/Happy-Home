package com.backend.happyhome.repository.user_repos;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.happyhome.entities.User;
import com.backend.happyhome.entities.UserImage;

public interface UserImageRepository extends JpaRepository<UserImage, Long> {

	Optional<UserImage> findByMyUser(User user);
}
