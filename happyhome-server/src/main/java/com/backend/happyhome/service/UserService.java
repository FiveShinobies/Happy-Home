package com.backend.happyhome.service;

import com.backend.happyhome.dtos.UserLoginDtoC;
import com.backend.happyhome.dtos.VendorRegisterDtoC;
import com.backend.happyhome.dtos.ConsumerRegisterDtoC;
import com.backend.happyhome.entities.User;
import com.backend.happyhome.entities.enums.UserRole;

public interface UserService {

	User isUserPresent(UserLoginDtoC user);
	void registerConsumerUser(ConsumerRegisterDtoC user);
	void registerVendorUser(VendorRegisterDtoC user);
	
	Long giveRespectiveId(Long uid);

	boolean changePassword(Long uid , String newPass , UserRole role);
	
}
