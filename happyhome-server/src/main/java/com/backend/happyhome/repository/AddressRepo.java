package com.backend.happyhome.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.backend.happyhome.entities.Address;
import com.backend.happyhome.entities.User;

@Repository
public interface AddressRepo extends JpaRepository<Address, Long> {

	Address findByMyUser(User user);

	List<Address> findByMyUserUserId(Long uid);
	
}
