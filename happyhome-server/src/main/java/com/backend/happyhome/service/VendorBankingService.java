package com.backend.happyhome.service;

import com.backend.happyhome.dtos.VendorBankingResponseDTOE;

public interface VendorBankingService {
	VendorBankingResponseDTOE getVendorBankingDetails(Long vendorId);
}
