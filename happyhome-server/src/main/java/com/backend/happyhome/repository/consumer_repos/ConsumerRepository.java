package com.backend.happyhome.repository.consumer_repos;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.happyhome.entities.Consumer;
import com.backend.happyhome.entities.User;
import com.backend.happyhome.entities.UserImage;

public interface ConsumerRepository extends JpaRepository<Consumer, Long> {
    
    Optional<UserImage> findByMyUser(User user);
}
