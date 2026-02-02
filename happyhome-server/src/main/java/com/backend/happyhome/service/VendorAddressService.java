package com.backend.happyhome.service;

import com.backend.happyhome.dtos.VendorAddressResponseDTOE;

public interface VendorAddressService {
	VendorAddressResponseDTOE getVendorAddress(Long vendorId);
}
