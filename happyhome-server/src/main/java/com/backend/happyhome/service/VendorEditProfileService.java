package com.backend.happyhome.service;

import com.backend.happyhome.dtos.VendorEditProfileRequestDTOE;

public interface VendorEditProfileService {
	void editProfile(Long vendorId, VendorEditProfileRequestDTOE request);
}
