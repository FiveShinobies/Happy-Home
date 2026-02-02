package com.backend.happyhome.repository.user_repos;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.happyhome.entities.User;

public interface UserRepository extends JpaRepository<User, Long> {
	

}
