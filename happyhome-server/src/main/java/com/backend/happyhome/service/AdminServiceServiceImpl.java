package com.backend.happyhome.service;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.backend.happyhome.audit.AuditAction;
import com.backend.happyhome.audit.annotation.Audit;
import com.backend.happyhome.custom_exceptions.ImageNotUploadedException;
import com.backend.happyhome.custom_exceptions.ServiceNotFoundException;
import com.backend.happyhome.dtos.CreateServiceRequestDTOB;
import com.backend.happyhome.dtos.ServiceDetailsForEditDTOB;
import com.backend.happyhome.dtos.UpdateServiceRequestDTOB;
import com.backend.happyhome.entities.HouseholdService;
import com.backend.happyhome.entities.ServiceImage;
import com.backend.happyhome.entities.Vendor;
import com.backend.happyhome.repository.HouseholdServiceRepo;
import com.backend.happyhome.repository.ServiceImageRepo;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class AdminServiceServiceImpl implements AdminServiceService {

	private final HouseholdServiceRepo serviceRepo;
	private final ServiceImageRepo serviceImageRepo;

	@Override
	public ServiceDetailsForEditDTOB getServiceDetailsById(Long sid) {

		HouseholdService service = serviceRepo.findByServiceIdAndActiveTrue(sid)
				.orElseThrow(() -> new ServiceNotFoundException("Service not found with id: " + sid));

		return new ServiceDetailsForEditDTOB(service.getServiceId(), service.getServiceName(), service.getShortDesc(),
				service.getLongDesc(), service.getPrice(), service.getCategory());
	}

	@Override
	@Audit(action = AuditAction.SERVICE_CREATED)
	public Long createService(CreateServiceRequestDTOB request, MultipartFile imageFile)
			throws ImageNotUploadedException {

		// Creating a service object
		HouseholdService service = new HouseholdService();

		// setting up the fields of service object
		service.setServiceName(request.getServiceName());
		service.setShortDesc(request.getShortDesc());
		service.setLongDesc(request.getLongDesc());
		service.setPrice(request.getPrice());
		service.setCategory(request.getCategory());

		// Saving the service in service table
		HouseholdService savedService = serviceRepo.save(service);

		// Saving the images in service Image table
		if(imageFile != null) {
			try {
				ServiceImage image = new ServiceImage();
				image.setImage(imageFile.getBytes());
				image.setMyService(savedService);
	
				serviceImageRepo.save(image);
			} catch (IOException e) {
	
				throw new ImageNotUploadedException("Failed to add image bytes");
			}
		}

		return savedService.getServiceId();
	}


	@Override
	@Audit(action = AuditAction.SERVICE_DELETED)
	public void deleteService(Long sid) {

		HouseholdService service = serviceRepo.findByServiceIdAndActiveTrue(sid)
				.orElseThrow(() -> new ServiceNotFoundException("Service is not found with id: " + sid));
		// soft delete
		service.setActive(false);
	}

	@Override
	@Audit(action = AuditAction.SERVICE_UPDATED)
	public void updateService(Long serviceId, UpdateServiceRequestDTOB dto,MultipartFile image) {

		HouseholdService service = serviceRepo.findByServiceIdAndActiveTrue(serviceId)
				.orElseThrow(() -> new ServiceNotFoundException("Service not found with serviceId: " + serviceId));

		service.setServiceName(dto.getServiceName());
		service.setShortDesc(dto.getShortDesc());
		service.setLongDesc(dto.getLongDesc());
		service.setPrice(dto.getPrice());
		if(image != null) {
			
			try {
				ServiceImage serviceImage = new ServiceImage();
				serviceImage.setImage(image.getBytes());
				serviceImage.setMyService(service);
				
				serviceImageRepo.save(serviceImage);
				
			} catch (IOException e) {
				// TODO: handle exception
				throw new ImageNotUploadedException("Failed to add image");
			}
		}

	}

	

}
