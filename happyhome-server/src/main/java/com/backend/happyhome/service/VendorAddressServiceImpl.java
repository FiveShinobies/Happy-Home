package com.backend.happyhome.service;

import org.springframework.stereotype.Service;

import com.backend.happyhome.custom_exceptions.ResourceNotFoundException;
import com.backend.happyhome.dtos.VendorAddressResponseDTOE;
import com.backend.happyhome.entities.Address;
import com.backend.happyhome.entities.Vendor;
import com.backend.happyhome.repository.VendorAddressRepo;
import com.backend.happyhome.repository.VendorRepo;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service 
@Transactional
@RequiredArgsConstructor
public class VendorAddressServiceImpl implements VendorAddressService {

	private final VendorRepo vendorRepository;
	private final VendorAddressRepo vendorAddressRepository;
	
	@Override
	public VendorAddressResponseDTOE getVendorAddress(Long vendorId) {
		
		Vendor vendor = vendorRepository.findById(vendorId)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid Vendor Id"));
		
		Address address = vendorAddressRepository.findByMyUserUserId(vendor.getMyUser().getUserId())
				.orElseThrow(() -> new ResourceNotFoundException("Address Not Found"));
		
		VendorAddressResponseDTOE response = new VendorAddressResponseDTOE();
		response.setHomeNo(address.getHomeNo());
		response.setCity(address.getCity());
		response.setState(address.getState());
		response.setPincode(address.getPincode());
		
		return response;
	}

}
