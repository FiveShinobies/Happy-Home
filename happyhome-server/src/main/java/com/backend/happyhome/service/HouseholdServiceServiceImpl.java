package com.backend.happyhome.service;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.springframework.stereotype.Service;

import com.backend.happyhome.custom_exceptions.ServiceNotFoundException;
import com.backend.happyhome.dtos.ConsumerReviewDTOA;
import com.backend.happyhome.dtos.HouseholdServicesListDTOB;
import com.backend.happyhome.dtos.ServiceDetailsDTOB;
import com.backend.happyhome.dtos.ServiceReviewDTOB;
import com.backend.happyhome.entities.ConsumerReview;
import com.backend.happyhome.entities.HouseholdService;
import com.backend.happyhome.entities.ServiceImage;
import com.backend.happyhome.entities.enums.Category;
import com.backend.happyhome.repository.HouseholdServiceRepo;
import com.backend.happyhome.repository.ServiceImageRepo;
import com.backend.happyhome.repository.ServiceReviewRepo;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class HouseholdServiceServiceImpl implements HouseholdServiceService {
	
	private final HouseholdServiceRepo householdServiceRepo;
	private final ServiceImageRepo serviceImageRepo;
	private final ServiceReviewRepo serviceReviewRepo;

	
	private Double calculateAverageRating(List<ConsumerReview> reviews) {

	    if (reviews == null || reviews.isEmpty()) {
	        return 0.0;
	    }

	    double sum = 0.0;

	    for (ConsumerReview review : reviews) {
	        sum += review.getRating();
	    }

	    return sum / reviews.size();
	}
	
	
	@Override
	public List<HouseholdServicesListDTOB> getAllHouseholdServices() {
		
	
		Double avgRating;
		
		
		List<HouseholdServicesListDTOB> listOfServices = new ArrayList<>();
		List<ConsumerReview> reviewsForAService = new ArrayList<>();
		
		//getting list of services 
		List<HouseholdService> services = householdServiceRepo.findByActiveTrue();
		
		//All reviews
		List<ConsumerReview> consumerReviews = serviceReviewRepo.findAll();
		
		for (HouseholdService householdService : services) {
			
			//getting images for specific service
			List<byte[]> serviceImages = serviceImageRepo.findByMyService(householdService)
					.stream()
					.map(ServiceImage::getImage) //method reference similar to image - > image.getImage()
					.toList();
			
			
				//Reviews of a specific Service
				 reviewsForAService = consumerReviews
						 .stream()
						 .filter(f -> f.getMyOrder().getMyServices().getServiceName()
								 .equals(householdService.getServiceName()))
						 .toList();
				 
				 //Average Rating
				 avgRating = calculateAverageRating(reviewsForAService);
			
			
			//Initializing and Adding to dto list
			listOfServices.add(new HouseholdServicesListDTOB(householdService.getServiceId(),householdService.getServiceName(),householdService.getShortDesc(),householdService.getPrice(),householdService.getCategory(),avgRating, serviceImages));
		}
		
		return listOfServices;
	}

	
	
	@Override
	public ServiceDetailsDTOB getServiceById(Long serviceId) {
	
		Double avgRating;
		
		ServiceDetailsDTOB serviceDetails = new ServiceDetailsDTOB();
		
		
		
		//getting the services details by ID
		HouseholdService householdService =  householdServiceRepo.findByServiceIdAndActiveTrue(serviceId)
				.orElseThrow(()-> 
				new ServiceNotFoundException("Service Not found with id: "+ serviceId));
	
		
		//Images for the specific Service
		 List<byte[]> images = serviceImageRepo.findByMyService(householdService)
				 .stream()
				 .map(ServiceImage::getImage)
				 .toList();
		 
		//All reviews of a specific serviceID
		List<ConsumerReview> serviceReviews =  serviceReviewRepo.findByMyOrder_MyServices_ServiceId(serviceId);
		 

		 
		 //Average Ratings
		avgRating = calculateAverageRating(serviceReviews);
		 
		 
		 //ServiceReview DTO
		 List<ServiceReviewDTOB> reviews = new ArrayList<>();
		 

		 for (ConsumerReview r : serviceReviews ) {
			 reviews.add(new ServiceReviewDTOB(r.getRating(),r.getDescription()));
		 }
		 
		 
		 //setting the fields of serviceDetailsDTOs
		 serviceDetails.setImages(images);
		 serviceDetails.setReviews(reviews);
		 serviceDetails.setServiceId(householdService.getServiceId());
		 serviceDetails.setServiceName(householdService.getServiceName());
		 serviceDetails.setShortDesc(householdService.getShortDesc());
		 serviceDetails.setLongDesc(householdService.getLongDesc());
		 serviceDetails.setPrice(householdService.getPrice());
		 serviceDetails.setCategory(householdService.getCategory());
		 serviceDetails.setAvgRating(avgRating);
		 
		 
		
		return serviceDetails;
	}


	@Override
	public List<Category> getCategories() {
		// TODO Auto-generated method stub
		
		return householdServiceRepo.findByCategoryIsNotNull()
				.stream()
				.map(HouseholdService::getCategory)
				.distinct()
				.toList();
	}


	@Override
	public List<String> getServicesForCategory(Category category) {
		// TODO Auto-generated method stub
		return householdServiceRepo.findByCategory(category)
				.stream()
				.map(HouseholdService::getServiceName)
				.toList();
				
	}
	
	

}
