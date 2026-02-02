package com.backend.happyhome.service;

import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.backend.happyhome.custom_exceptions.ResourceNotFoundException;
import com.backend.happyhome.dtos.AddressDto;
import com.backend.happyhome.dtos.ServiceDtoB;
import com.backend.happyhome.dtos.VendorProfileResponseDTOE;
import com.backend.happyhome.repository.AddressRepo;
import com.backend.happyhome.repository.HouseholdServiceRepo;
import com.backend.happyhome.repository.OrderRepo;
import com.backend.happyhome.repository.VendorImageRepo;
import com.backend.happyhome.repository.VendorRepo;
import com.backend.happyhome.repository.VendorReviewRepo;
import com.backend.happyhome.entities.Address;
import com.backend.happyhome.entities.HouseholdService;
import com.backend.happyhome.entities.Language;
import com.backend.happyhome.entities.User;
import com.backend.happyhome.entities.UserImage;
import com.backend.happyhome.entities.Vendor;
import java.util.Base64;
import java.util.List;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class VendorDetailsServiceImpl implements VendorDetailsService {

	private final HouseholdServiceRepo serviceRepo;
	private final VendorRepo vendorRepository;
	private final OrderRepo orderRepository;
	private final VendorReviewRepo vendorReviewRepository;
	private final VendorImageRepo vendorImageRepository;
	private final AddressRepo addressRepo;

	@Override
	public VendorProfileResponseDTOE getVendorDetails(Long vendorId) {

		Vendor vendor = vendorRepository.findById(vendorId)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid Vendor Id"));

		Long userId = vendor.getMyUser().getUserId();

		VendorProfileResponseDTOE response = new VendorProfileResponseDTOE();

		User user = vendor.getMyUser();

		List<AddressDto> address = addressRepo.findByMyUserUserId(userId).stream()
				.map(a -> new AddressDto(a.getAddressId(),a.getHomeNo(), a.getTown(), a.getCity(), a.getState(), a.getPincode()))
				.toList();

		response.setFirstName(user.getFirstName());
		response.setLastName(user.getLastName());
		response.setFullName(user.getFirstName() + " " + user.getLastName());
		response.setEmail(user.getEmail());
		response.setPhone(user.getPhone());
		response.setDateOfBirth(user.getDob());
		response.setAddress(address.get(0));
		response.setExperienceYears(vendor.getExperience());

		response.setServicesProvided(
				vendor.getMyServices().stream().map(s -> new ServiceDtoB(s.getServiceId(), s.getServiceName())).toList());
		response.setTotalServices(orderRepository.countByMyVendorVendorId(vendorId));
		response.setTotalReviews(vendorReviewRepository.countByMyOrderMyVendorVendorId(vendorId));
		response.setRating(vendorReviewRepository.findAverageRating(vendorId));

		response.setLanguages(vendor.getMyUser().getLanguages().stream().map(Language::getLangName).toList());

		response.setAadhaarNumber(mask(vendor.getAadharNo()));
		response.setPanNumber(mask(vendor.getPanNo()));

//		vendorImageRepository.findByMyUserUserId(user.getUserId())
//		.ifPresent(userImage -> {
//			response.setImages(userImage);		});
		
		byte[] pImage = vendorImageRepository
				.findByMyUserUserId(userId)
				.map(UserImage::getImage)
				.orElse(null);
				
		response.setProfileImage(pImage);

	
		//getting all services
		List<ServiceDtoB> services =  serviceRepo.findByActiveTrue()
				.stream()
				.map(s-> new ServiceDtoB(s.getServiceId(), s.getServiceName()))
				.toList();
		
		response.setAllServices(services);
		
		return response;
	}

	private String mask(String value) {
		if (value == null || value.length() < 4) {
			return "XXXX";
		}
		return "XXXX XXXX " + value.substring(value.length() - 4);
	}
}
