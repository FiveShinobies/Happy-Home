package com.backend.happyhome.service;

import com.backend.happyhome.dtos.VendorProfileResponseDTOE;

public interface VendorDetailsService {
	VendorProfileResponseDTOE getVendorDetails(Long vendorId);
}
