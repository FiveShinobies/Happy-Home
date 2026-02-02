package com.backend.happyhome.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.backend.happyhome.entities.Consumer;
import com.backend.happyhome.entities.User;
import com.backend.happyhome.entities.enums.UserRole;

@Repository
public interface UserRepo extends JpaRepository<User, Long> {

	Optional<User> getByEmail(String email);
	Optional<User> getByPhone(String phone);
	List<User> findByRole(UserRole consumer);

}
