package com.backend.happyhome.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.backend.happyhome.entities.Consumer;
import com.backend.happyhome.entities.enums.UserRole;

@Repository
public interface ConsumerRepo extends JpaRepository<Consumer, Long> {

	Consumer findByMyUser_UserId(Long userId);
	
}
