package com.backend.happyhome.service;

import java.util.List;

import com.backend.happyhome.dtos.AdminEditVendorRequestDTOE;
import com.backend.happyhome.dtos.AdminOrderDetailsDTOE;
import com.backend.happyhome.dtos.VendorDetailsAdminDTOE;
import com.backend.happyhome.dtos.VendorSummaryDTOE;

public interface AdminVendorService {
	
	List<VendorSummaryDTOE> getAllVendors();
	VendorDetailsAdminDTOE getVendorDetailsById(Long vendorId);
	void editVendorDetails(Long vendorId, AdminEditVendorRequestDTOE request);
	List<AdminOrderDetailsDTOE> getVendorOrders(Long vendorId);
}
