package com.backend.happyhome.service;


import org.springframework.stereotype.Service;

import com.backend.happyhome.custom_exceptions.ResourceNotFoundException;
import com.backend.happyhome.dtos.VendorBankingResponseDTOE;
import com.backend.happyhome.entities.Vendor;
import com.backend.happyhome.entities.VendorBanking;
import com.backend.happyhome.repository.VendorBankingRepo;
import com.backend.happyhome.repository.VendorRepo;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class VendorBankingServiceImpl implements VendorBankingService {

	private final VendorRepo vendorRepository;
	private final VendorBankingRepo vendorBankingRepository;
	@Override
	public VendorBankingResponseDTOE getVendorBankingDetails(Long vendorId) {
		
		Vendor vendor = vendorRepository.findById(vendorId)
                .orElseThrow(() -> new ResourceNotFoundException("Invalid vendor id"));
		
		VendorBanking banking = vendorBankingRepository.findByMyVendorVendorId(vendorId)
                .orElse(null);
		
		 VendorBankingResponseDTOE response = new VendorBankingResponseDTOE();
		 
		 if(banking == null) {
			 return response;
		 }
		 response.setBankName(banking.getBankName());
	        response.setBranchName(banking.getBranchName());
	        response.setIfscCode(banking.getIfscCode());
	        response.setHolderName(banking.getHolderName());
	        response.setAccountNo(maskAccountNo(banking.getAccountNo()));
	        
	        
	        return response;
	}
	
	private String maskAccountNo(String accNo) {
        if (accNo == null || accNo.length() < 4) {
            return "XXXX";
        }
        return "XXXXXX" + accNo.substring(accNo.length() - 4);
    }

}
