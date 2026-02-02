package com.backend.happyhome.service;



import java.util.List;

import org.springframework.stereotype.Service;

import com.backend.happyhome.custom_exceptions.ServiceNotFoundException;
import com.backend.happyhome.custom_exceptions.UserNotPresentException;
import com.backend.happyhome.dtos.ConsumerAddressDetailsDTOB;
import com.backend.happyhome.dtos.consumer_dto.ConsumerDetailsDTOB;
import com.backend.happyhome.dtos.consumer_dto.ConsumerDetailsForBookingDTOB;
import com.backend.happyhome.dtos.consumer_dto.HouseholdServiceDtoA;
import com.backend.happyhome.entities.Consumer;
import com.backend.happyhome.entities.HouseholdService;
import com.backend.happyhome.entities.User;
import com.backend.happyhome.repository.AddressRepo;
import com.backend.happyhome.repository.ConsumerRepo;
import com.backend.happyhome.repository.HouseholdServiceRepo;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class ConsumerBookingServiceImpl implements ConsumerBookingService {
	
	private final ConsumerRepo consumerRepo;
	private final AddressRepo addressRepo;
	private final HouseholdServiceRepo hhRepo;
	
	@Override
	public ConsumerDetailsForBookingDTOB getConsumerDetailsForBooking(Long cid , Long sid) {
		
		ConsumerDetailsForBookingDTOB consumerDetailsforBooking = new ConsumerDetailsForBookingDTOB();
		ConsumerDetailsDTOB consumerDetails = new ConsumerDetailsDTOB();
		
		//Getting the consumer with consumer id
		Consumer consumer =  consumerRepo.findById(cid)
				.orElseThrow(()->new UserNotPresentException());
		
		//Getting the user
		User user =  consumer.getMyUser();
		
		//Getting the userId from myUser 
		Long userId = consumer.getMyUser().getUserId();
		
		
//		//Getting address of the user
		List<ConsumerAddressDetailsDTOB> addresses = addressRepo.findByMyUserUserId(userId)
				.stream()
				.map(address -> new ConsumerAddressDetailsDTOB(
						address.getAddressId(),
						address.getHomeNo(),
						address.getTown(),
						address.getCity(),
						address.getState(),
						address.getPincode()))
				.toList();
		
		//setting Consumer Details
		consumerDetails.setCid(cid);
		consumerDetails.setName(user.getFirstName().concat(" " + user.getLastName()));
		consumerDetails.setPhone(user.getPhone());
		consumerDetails.setEmail(user.getEmail());
		
		
		//setting Consumer details with addresses
		consumerDetailsforBooking.setConsumer(consumerDetails);
		consumerDetailsforBooking.setAddresses(addresses);
		
		HouseholdService h = hhRepo.findById(sid).orElseThrow(() ->new ServiceNotFoundException("Service doest not exists"));
		
		consumerDetailsforBooking.setService(mapToHHDto(h));
		
		return consumerDetailsforBooking;
	}
	
	
	private static HouseholdServiceDtoA mapToHHDto(HouseholdService service) {

	    return new HouseholdServiceDtoA(
	        service.getServiceId(),
	        service.getServiceName(),
	        service.getShortDesc(),
	        service.getLongDesc(),
	        service.getPrice(),
	        service.getCategory(),
	        service.isActive()
	    );
	}

	

}
