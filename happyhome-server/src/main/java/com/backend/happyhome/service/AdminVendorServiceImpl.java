package com.backend.happyhome.service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.backend.happyhome.custom_exceptions.ResourceNotFoundException;
import com.backend.happyhome.dtos.AdminEditVendorRequestDTOE;
import com.backend.happyhome.dtos.AdminOrderDetailsDTOE;
import com.backend.happyhome.dtos.VendorDetailsAdminDTOE;
import com.backend.happyhome.dtos.VendorSummaryDTOE;
import com.backend.happyhome.entities.Address;
import com.backend.happyhome.entities.HouseholdService;
import com.backend.happyhome.entities.Language;
import com.backend.happyhome.entities.User;
import com.backend.happyhome.entities.Vendor;
import com.backend.happyhome.repository.LanguageRepo;
import com.backend.happyhome.repository.OrderRepo;
import com.backend.happyhome.repository.ServiceRepo;
import com.backend.happyhome.repository.VendorAddressRepo;
import com.backend.happyhome.repository.VendorRepo;
import com.backend.happyhome.repository.VendorReviewRepo;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class AdminVendorServiceImpl implements AdminVendorService {

	private final VendorRepo vendorRepository;
	private final VendorAddressRepo vendorAddressRepository;
	private final VendorReviewRepo vendorReviewRepository;
	private final ServiceRepo serviceRepository;
	private final LanguageRepo languageRepository;
	private final OrderRepo orderRepository;
	
	@Override
	public List<VendorSummaryDTOE> getAllVendors() {
		return vendorRepository.findAll().stream().map(vendor ->{
			User user = vendor.getMyUser();
			Address address = vendorAddressRepository.findByMyUserUserId(user.getUserId())
					.orElse(null);
			
			VendorSummaryDTOE dto = new VendorSummaryDTOE();
			dto.setVendorId(vendor.getVendorId());
			dto.setName(user.getFirstName() + " " + user.getLastName());
			dto.setEmail(user.getEmail());
			dto.setCity(address != null ? address.getCity() : null);
			return dto;
		}).toList();
	}

	@Override
	public VendorDetailsAdminDTOE getVendorDetailsById(Long vendorId) {
		Vendor vendor = vendorRepository.findById(vendorId)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid Vendor"));
		
		User user = vendor.getMyUser();
		Address address = vendorAddressRepository.findByMyUserUserId(user.getUserId())
				.orElse(null);
		
		VendorDetailsAdminDTOE dto = new VendorDetailsAdminDTOE();
		dto.setVendorId(vendor.getVendorId());
		dto.setName(user.getFirstName() + " " + user.getLastName());
		dto.setEmail(user.getEmail());
		dto.setPhone(user.getPhone());
		dto.setCity(address != null ? address.getCity() : null);
		dto.setAddress(address != null ? address.getHomeNo() : null);
		dto.setRating(vendorReviewRepository.findAverageRating(vendorId));
		dto.setJoinDate(user.getDob());
		
		return dto;
	}

	@Override
	public void editVendorDetails(Long vendorId, AdminEditVendorRequestDTOE request) {
		Vendor vendor = vendorRepository.findById(vendorId)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid Vendor Id"));
		
		User user = vendor.getMyUser();
		
		// User Update
		if(request.getFirstName() != null)
			user.setFirstName(request.getFirstName());
		
		if(request.getLastName() != null)
			user.setLastName(request.getLastName());
		
		if(request.getEmail() != null)
			user.setEmail(request.getEmail());
		
		if(request.getPhone() != null)
			user.setPhone(request.getPhone());
		
		if(request.getDob() != null)
			user.setDob(request.getDob());
		
		if(request.getPassword() != null)
			user.setPassword(request.getPassword());
		
		if(request.getUserStatus() != null)
			user.setUserStatus(request.getUserStatus());
		
		//Address Update
		Address address = vendorAddressRepository.findByMyUserUserId(user.getUserId())
				.orElseThrow(() -> new ResourceNotFoundException("Address Not Found"));
		
		if(request.getHomeNo() != null)
			address.setHomeNo(request.getHomeNo());
		
		if(request.getCity() != null)
			address.setCity(request.getCity());
		
		if(request.getState() != null)
			address.setState(request.getState());
		
		if(request.getPincode() != null)
			address.setPincode(request.getPincode());
		
		//Services Update
		if(request.getServiceIds() != null) {
			Set<HouseholdService> services = serviceRepository.findAllById(request.getServiceIds())
					.stream().collect(Collectors.toSet());
			vendor.setMyServices(services);
		}
		
		//Language Update
		if(request.getLanguageIds() != null) {
			Set<Language> languages = languageRepository.findAllById(request.getLanguageIds())
					.stream().collect(Collectors.toSet());
			vendor.getMyUser().setLanguages(languages);
		}
		
		//Experience Update
		if(request.getExperience() != null)
			vendor.setExperience(request.getExperience());
		
		vendorRepository.save(vendor);
	}

	@Override
	public List<AdminOrderDetailsDTOE> getVendorOrders(Long vendorId) {
		
		return orderRepository.findByMyVendorVendorId(vendorId)
				.stream().map(order -> {
					AdminOrderDetailsDTOE dto = new AdminOrderDetailsDTOE();
					dto.setOrderId(order.getOrderId());
					dto.setOrderDate(order.getOrderDateTime());
					dto.setName(order.getMyServices().getServiceName());
					dto.setTotal(order.getOrderPrice());
					dto.setStatus(order.getStatus());
					return dto;
				}).toList();
	}

}
