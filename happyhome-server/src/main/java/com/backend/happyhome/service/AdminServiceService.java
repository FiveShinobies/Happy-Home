package com.backend.happyhome.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.backend.happyhome.custom_exceptions.ImageNotUploadedException;
import com.backend.happyhome.dtos.CreateServiceRequestDTOB;
import com.backend.happyhome.dtos.ServiceDetailsForEditDTOB;
import com.backend.happyhome.dtos.UpdateServiceRequestDTOB;
import com.backend.happyhome.entities.HouseholdService;

public interface AdminServiceService {

	
	ServiceDetailsForEditDTOB getServiceDetailsById(Long sid);
	
//	Long createService(CreateServiceRequestDTOB request, MultipartFile[] images) throws ImageNotUploadedException;
	Long createService(CreateServiceRequestDTOB request, MultipartFile images) throws ImageNotUploadedException;
	
	void deleteService(Long sid);
	
	void updateService(Long serviceId, UpdateServiceRequestDTOB dto, MultipartFile image) throws ImageNotUploadedException;
	
	
}
