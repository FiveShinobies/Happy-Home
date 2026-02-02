package com.backend.happyhome.service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.backend.happyhome.controller.ConsumerController;
import com.backend.happyhome.custom_exceptions.ConsumerNotFoundException;
import com.backend.happyhome.custom_exceptions.OrderDoesNotExist;
import com.backend.happyhome.custom_exceptions.UserNotPresentException;
import com.backend.happyhome.dto.OrderDTO;
import com.backend.happyhome.dtos.AddressDto;
import com.backend.happyhome.dtos.ConsumerDtoC;
import com.backend.happyhome.dtos.ConsumerSummeryDtoB;
import com.backend.happyhome.dtos.consumer_dto.EditConsumerProfileRequestD;
import com.backend.happyhome.entities.Address;
import com.backend.happyhome.entities.Consumer;
import com.backend.happyhome.entities.Language;
import com.backend.happyhome.entities.Order;
import com.backend.happyhome.entities.User;
import com.backend.happyhome.entities.enums.UserRole;
import com.backend.happyhome.repository.AddressRepo;
import com.backend.happyhome.repository.ConsumerRepo;
import com.backend.happyhome.repository.LanguageRepo;
import com.backend.happyhome.repository.OrderRepo;
import com.backend.happyhome.repository.UserImageRepo;
import com.backend.happyhome.repository.UserRepo;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class ConsumerServiceImpl implements ConsumerService {

	private final ConsumerRepo consumerRepo;
	private final UserRepo userRepo;
	private final AddressRepo addressRepo;
	private final OrderRepo orderRepo;
	private final UserImageRepo imgRepo;
	private final LanguageRepo langRepo;

	@Override
	public List<ConsumerDtoC> getAllConsumers() {
		List<User> users = userRepo.findByRole(UserRole.CONSUMER);
		List<ConsumerDtoC> result = new ArrayList<>();
		for(User u : users) {
			ConsumerDtoC dto = new ConsumerDtoC();
			dto.setFirstName(u.getFirstName());
			dto.setLastName(u.getLastName());
			dto.setEmail(u.getEmail());
			dto.setPassword(u.getPassword());
			dto.setPhone(u.getPhone());
			dto.setDob(u.getDob());
			dto.setUserStatus(u.getUserStatus());
			for(Language lang : u.getLanguages()) {
				dto.getLanguages().add(lang.getLangName());
			}
			dto.setRewardPoints(consumerRepo.findByMyUser_UserId(u.getUserId()).getRewardPoints());
			
			List<AddressDto> ad2 = new ArrayList<>();
			List<Address> address = addressRepo.findByMyUserUserId(u.getUserId());
			for(Address ad : address) {
				AddressDto x = new AddressDto();
				x.setAddressId(ad.getAddressId());
				x.setCity(ad.getCity());
				x.setHomeNo(ad.getHomeNo());
				x.setPincode(ad.getPincode());
				x.setState(ad.getState());
				x.setTown(ad.getTown());
				
				ad2.add(x);
			}
			
			dto.setAddress(ad2);
			
			result.add(dto);
		}
		
		return result;
	}

	@Override
	public ConsumerDtoC getConsumerDetailsById(Long cId) {
		Consumer c = consumerRepo.findById(cId).orElseThrow(()-> new ConsumerNotFoundException());
		User u = c.getMyUser();
		//map to dto
		ConsumerDtoC dto = new ConsumerDtoC();
		dto.setFirstName(u.getFirstName());
		dto.setLastName(u.getLastName());
		dto.setEmail(u.getEmail());
		dto.setPassword(u.getPassword());
		dto.setPhone(u.getPhone());
		dto.setDob(u.getDob());
		dto.setUserStatus(u.getUserStatus());
		dto.setRewardPoints(c.getRewardPoints());
		
		for(Language lang : u.getLanguages()) {
			dto.getLanguages().add(lang.getLangName());
		}
		
		List<AddressDto> ad2 = new ArrayList<>();
		List<Address> address = addressRepo.findByMyUserUserId(u.getUserId());
		for(Address ad : address) {
			AddressDto x = new AddressDto();
			x.setAddressId(ad.getAddressId());
			x.setCity(ad.getCity());
			x.setHomeNo(ad.getHomeNo());
			x.setPincode(ad.getPincode());
			x.setState(ad.getState());
			x.setTown(ad.getTown());
			
			ad2.add(x);
		}
		
		dto.setAddress(ad2);
		
		return dto;
	}


	@Override
	public List<Order> getAllOrdersOfConsumer(Long cId) {
		Consumer myConsumer = consumerRepo.findById(cId).orElseThrow(()-> new ConsumerNotFoundException());
		return orderRepo.findByMyConsumer(myConsumer);
	}
	
	public OrderDTO getOrderOfConsumer(Long oId) {
		return ConsumerController.mapToOrderDTO(orderRepo.findById(oId).orElseThrow(()-> new OrderDoesNotExist()));
	}


	@Override
	public boolean addAddress(Long cid , AddressDto address) {
		
		User user = consumerRepo.findById(cid).orElseThrow(() -> new UserNotPresentException()).getMyUser();
		
		Address ad = new Address();
		ad.setCity(address.getCity());
		ad.setHomeNo(address.getHomeNo());
		ad.setPincode(address.getPincode());
		ad.setState(address.getState());
		ad.setTown(address.getTown());
		ad.setMyUser(user);
		addressRepo.save(ad);
		
		return true;
	}

	@Override
	public boolean editAddress(Long aid, AddressDto ad) {
		
		Address a = addressRepo.findById(aid).orElseThrow();
		
		a.setCity(ad.getCity());
		a.setHomeNo(ad.getHomeNo());
		a.setPincode(ad.getPincode());
		a.setState(ad.getState());
		a.setTown(ad.getTown());

		addressRepo.save(a);

		return true;
	}

	@Override
	public boolean deleteAddress(Long aid) {
		Address a = addressRepo.findById(aid).orElse(null);
		addressRepo.delete(a);		
		return true;
	}

	@Override
	public EditConsumerProfileRequestD editConsumerDetails(
	        EditConsumerProfileRequestD dto, Long cId) {

	    Consumer c = consumerRepo.findById(cId)
	            .orElseThrow(ConsumerNotFoundException::new);

	    User user = c.getMyUser();

	    // basic fields
	    user.setFirstName(dto.getFirstName());
	    user.setLastName(dto.getLastName());
	    user.setEmail(dto.getEmail());
	    user.setPhone(dto.getPhoneNumber());
	    user.setDob(dto.getDateOfBirth());

	    // languages
	    Set<Language> managedLanguages = new HashSet<>();

	    for (String langName : dto.getLanguages()) {
	        Language language = langRepo.findByLangName(langName)
	                .orElseThrow(() -> 
	                    new RuntimeException("Language not found: " + langName)
	                );
	        managedLanguages.add(language);
	    }

	    user.setLanguages(managedLanguages);
	    
	    
	    
	    userRepo.save(user);

	    return dto; // or map back response DTO
	}

	@Override
	public List<ConsumerSummeryDtoB> getAllConsumerForAdmin() {
		// TODO Auto-generated method stub
		List<ConsumerSummeryDtoB> consumer = consumerRepo.findAll()
				.stream()
				.map(c ->{
					 List<Address> addresses = addressRepo.findByMyUserUserId(c.getMyUser().getUserId());
					 return new ConsumerSummeryDtoB
							 (c.getConsumerId(),
							  c.getMyUser().getFirstName()+" "+c.getMyUser().getLastName(), 
							  c.getMyUser().getEmail(), 
							  addresses.get(0).getCity());
				}).toList();
		return consumer;
	}


}

//	@Override
//	public ConsumerDtoC editConsumerDetails(ConsumerDtoC dto,Long cId) {
//		Consumer c = consumerRepo.findById(cId).orElseThrow(()-> new ConsumerNotFoundException());
//		
//		User user = c.getMyUser();
//		//map dto to entity
//		user.setDob(dto.getDob());
//		user.setEmail(dto.getEmail());
//		user.setFirstName(dto.getFirstName());
//		for(Language lang : user.getLanguages()) {
//			dto.getLanguages().add(lang.getLangName());
//		}
//		user.setLastName(dto.getLastName());
//		user.setPassword(dto.getPassword());
//		user.setPhone(dto.getPhone());
//		user.setUserStatus(dto.getUserStatus());
//		
//		userRepo.save(user);
//		
//		c.setRewardPoints(dto.getRewardPoints());
//		consumerRepo.save(c);
//		
//		List<AddressDto> address2 = dto.getAddress();
//		
//		for(AddressDto address : address2 ) {
//			
//			Address ad = new Address();
//			ad.setCity(address.getCity());
//			ad.setHomeNo(address.getHomeNo());
//			ad.setPincode(address.getPincode());
//			ad.setState(address.getState());
//			ad.setTown(address.getTown());
//			ad.setMyUser(user);
//			
//			addressRepo.save(ad);
//			
//		}
//		return dto;
//	}