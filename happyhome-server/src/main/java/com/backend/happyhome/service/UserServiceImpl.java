package com.backend.happyhome.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.backend.happyhome.audit.AuditAction;
import com.backend.happyhome.audit.annotation.Audit;
import com.backend.happyhome.custom_exceptions.UserAlreadyPresentException;
import com.backend.happyhome.custom_exceptions.UserNotPresentException;
import com.backend.happyhome.dtos.ConsumerRegisterDtoC;
import com.backend.happyhome.dtos.ServiceDtoC;
import com.backend.happyhome.dtos.UserLoginDtoC;
import com.backend.happyhome.dtos.VendorRegisterDtoC;
import com.backend.happyhome.entities.Address;
import com.backend.happyhome.entities.Consumer;
import com.backend.happyhome.entities.HouseholdService;
import com.backend.happyhome.entities.User;
import com.backend.happyhome.entities.Vendor;
import com.backend.happyhome.entities.VendorWallet;
import com.backend.happyhome.entities.enums.UserRole;
import com.backend.happyhome.repository.AddressRepo;
import com.backend.happyhome.repository.ConsumerRepo;
import com.backend.happyhome.repository.ServiceRepo;
import com.backend.happyhome.repository.UserRepo;
import com.backend.happyhome.repository.VendorRepo;
import com.backend.happyhome.repository.language_repos.LanguageRepository;
import com.backend.happyhome.repository.vendor_repos.VendorWalletRepo;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

	private final UserRepo userRepo;
	private final VendorRepo vendorRepo;
	private final ConsumerRepo consumerRepo;
	private final AddressRepo addressRepo;
	private final ServiceRepo serviceRepo;
	private final LanguageRepository languageRepo;
	private final VendorWalletRepo vwRepo;
	private final PasswordEncoder passwordEncoder;
	
	@Override
	@Audit(action = AuditAction.LOGIN)
	public User isUserPresent(UserLoginDtoC user){
		
		User userFromDb = userRepo.getByEmail(user.getEmail()).orElseThrow(()->new UserNotPresentException());
		
        return userFromDb;
	}

	
	@Override
	@Audit(action = AuditAction.CONSUMER_REGISTERED)
	public void registerConsumerUser(ConsumerRegisterDtoC user) throws UserAlreadyPresentException {
		// TODO Auto-generated method stub
		if(userRepo.getByEmail(user.getEmail()).orElse(null) != null || userRepo.getByPhone(user.getPhone()).orElse(null) != null) 
		{;
			throw new UserAlreadyPresentException();
		}
		
		User userToDb = new User();
		userToDb.setFirstName(user.getFirstName());
		userToDb.setLastName(user.getLastName());
		userToDb.setEmail(user.getEmail());
		userToDb.setPassword(passwordEncoder.encode(user.getPassword()));
		userToDb.setDob(user.getDob());
		userToDb.setPhone(user.getPhone());
		userToDb.setRole(UserRole.CONSUMER);
		
		User u = userRepo.save(userToDb);
		
		
		
		Consumer consumer = new Consumer();
		consumer.setMyUser(u);
		consumer.setRewardPoints(0);
			
		consumerRepo.save(consumer);
		
		Address address = new Address();
		address.setCity(user.getAddress().getCity());
		address.setHomeNo(user.getAddress().getHomeNo());
		address.setMyUser(u);
		address.setPincode(user.getAddress().getPincode());
		address.setState(user.getAddress().getState());
		address.setTown(user.getAddress().getTown());
		
		addressRepo.save(address);
	}
	
	@Override
	@Audit(action = AuditAction.VENDOR_REGISTERED)
	public void registerVendorUser(VendorRegisterDtoC user) throws UserAlreadyPresentException{
		if(userRepo.getByEmail(user.getEmail()).orElse(null) != null || userRepo.getByPhone(user.getPhone()).orElse(null) != null) 
		{;
			throw new UserAlreadyPresentException();
		}
		
		User userToDb = new User();
		userToDb.setFirstName(user.getFirstName());
		userToDb.setLastName(user.getLastName());
		userToDb.setEmail(user.getEmail());
		userToDb.setPassword(passwordEncoder.encode(user.getPassword()));
		userToDb.setDob(user.getDob());
		userToDb.setPhone(user.getPhone());
		userToDb.setRole(UserRole.VENDOR);
		
		User u = userRepo.save(userToDb);
		
		Vendor vendor = new Vendor();
		vendor.setMyUser(u);
		vendor.setAadharNo(user.getAadhardNo());
		vendor.setPanNo(user.getPanNo());
		vendor.setExperience(user.getExperience());
		for(ServiceDtoC e : user.getServices()) {
			HouseholdService service = serviceRepo.findByCategoryAndServiceName(e.getCategory(), e.getServiceName());
			vendor.getMyServices().add(service);
		}
		
		vendor.setMyUser(userRepo.getByEmail(userToDb.getEmail()).get());
		vendor = vendorRepo.save(vendor);
		
		Address address = new Address();
		address.setCity(user.getAddress().getCity());
		address.setHomeNo(user.getAddress().getHomeNo());
		address.setMyUser(u);
		address.setPincode(user.getAddress().getPincode());
		address.setState(user.getAddress().getState());
		address.setTown(user.getAddress().getTown());
		
		addressRepo.save(address);
		
		VendorWallet vw = new VendorWallet();
		vw.setMyVendor(vendor);
		vwRepo.save(vw);
	}
	
	
	@Override
	public boolean changePassword(Long uid, String newPass , UserRole role) {
		User u = null;		
		if( role.equals(UserRole.CONSUMER)) {
			System.out.println("its is consumer");
			Consumer c = consumerRepo.findById(uid).orElseThrow(() -> new UserNotPresentException());
			u = userRepo.findById(c.getMyUser().getUserId()).orElseThrow(() -> new UserNotPresentException());
		}else if(role.equals(UserRole.VENDOR)) {			
			System.out.println("its is vendor");
			Vendor v = vendorRepo.findById(uid).orElseThrow(() -> new UserNotPresentException());
			u = userRepo.findById(v.getMyUser().getUserId()).orElseThrow(() -> new UserNotPresentException());
		}else {
			System.out.println("its is admin");
			u = userRepo.findById(uid).orElseThrow(() -> new UserNotPresentException());
		}
		
		u.setPassword(passwordEncoder.encode(newPass));
		
			userRepo.save(u);
		return true;
	}

		@Override
		public Long giveRespectiveId(Long uid) {
			
			Consumer c = consumerRepo.findByMyUser_UserId(uid);
			
			if(c != null) {
				return c.getConsumerId();
			}
			
			Vendor v = vendorRepo.findByMyUserUserId(uid);
			
			if(v != null) {
				return v.getVendorId();
			}
			
			return uid;
			
		}
		

}