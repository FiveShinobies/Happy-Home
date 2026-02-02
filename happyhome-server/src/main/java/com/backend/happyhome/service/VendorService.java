package com.backend.happyhome.service;

import com.backend.happyhome.dtos.OrderDtoC;
import com.backend.happyhome.dtos.vendor_dto.VendorDashboardDTOA;
import com.backend.happyhome.entities.Address;
import com.backend.happyhome.entities.VendorReview;
import com.backend.happyhome.entities.VendorWallet;

public interface VendorService {

	boolean acceptRequest(Long oId, Long vId);
	VendorReview getReview(Long oId);
	OrderDtoC getOrderOfVendor(Long oId);
	Address getAddressOfOrder(Long oId);
	
	boolean payVendor(Long oid);

	VendorWallet getWallet(Long vid);

	VendorDashboardDTOA dashboardData(Long vid);
}
