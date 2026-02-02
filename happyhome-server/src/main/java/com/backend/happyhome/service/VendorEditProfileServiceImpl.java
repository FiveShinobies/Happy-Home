package com.backend.happyhome.service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.backend.happyhome.custom_exceptions.ResourceNotFoundException;
import com.backend.happyhome.dtos.VendorEditProfileRequestDTOE;
import com.backend.happyhome.entities.Address;
import com.backend.happyhome.entities.HouseholdService;
import com.backend.happyhome.entities.Language;
import com.backend.happyhome.entities.User;
import com.backend.happyhome.entities.Vendor;
import com.backend.happyhome.entities.VendorBanking;
import com.backend.happyhome.repository.LanguageRepo;
import com.backend.happyhome.repository.ServiceRepo;
import com.backend.happyhome.repository.VendorAddressRepo;
import com.backend.happyhome.repository.VendorBankingRepo;
import com.backend.happyhome.repository.VendorRepo;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class VendorEditProfileServiceImpl implements VendorEditProfileService {

	private final VendorRepo vendorRepository;
	private final VendorAddressRepo vendorAddressRepository;
	private final ServiceRepo serviceRepository;
	private final LanguageRepo languageRepo;
	private final VendorBankingRepo vendorBankingRepo;

	@Override
	public void editProfile(Long vendorId, VendorEditProfileRequestDTOE request) {

		System.out.println(request);
		Vendor vendor = vendorRepository.findById(vendorId)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid Vendor ID"));

		User user = vendor.getMyUser();

		if (request.getFirstName() != null)
			user.setFirstName(request.getFirstName());

		if (request.getLastName() != null)
			user.setLastName(request.getLastName());

		if (request.getEmail() != null)
			user.setEmail(request.getEmail());

		if (request.getPhone() != null)
			user.setPhone(request.getPhone());

		if (request.getDob() != null)
			user.setDob(request.getDob());

		// Address Edit
		Address address = vendorAddressRepository.findByMyUserUserId(user.getUserId())
				.orElseThrow(() -> new ResourceNotFoundException("Address Not Found"));

		if (request.getHomeNo() != null)
			address.setHomeNo(request.getHomeNo());

		if (request.getCity() != null)
			address.setCity(request.getCity());

		if (request.getState() != null)
			address.setState(request.getState());

		if (request.getPincode() != null)
			address.setPincode(request.getPincode());

		// 🔹 UPDATE SERVICES (BY NAME)
//		if (request.getServicesProvided() != null && !request.getServicesProvided().isEmpty()) {
//
//			Set<HouseholdService> services = new HashSet<>(
//					serviceRepository.findAllById(request.getServicesProvided()));
//
//			System.out.print(services);
//			System.out.println("List size = " + services.size());
//			System.out.println("Set size  = " + new HashSet<>(services).size());
//			System.out.println("Requested: " + request.getServicesProvided());
//			System.out.println("Fetched  : " + services.stream()
//			    .map(s -> "'" + s.getServiceName() + "'")
//			    .toList());
//			if (services.size() != request.getServicesProvided().size()) {
//				throw new ResourceNotFoundException("One or more services not found");
//			}
//
//			vendor.setMyServices(services);
		if (request.getServicesProvided() != null && !request.getServicesProvided().isEmpty()) {

			

			// Convert List<Long> to Set<Long> for the query
			Set<Long> serviceIds = new HashSet<>(request.getServicesProvided());

			// Find services by IDs
			List<HouseholdService> foundServices = serviceRepository.findAllById(serviceIds);

			if (foundServices.size() != request.getServicesProvided().size()) {
				// Find which IDs are missing
				Set<Long> foundIds = foundServices.stream().map(HouseholdService::getServiceId)
						.collect(Collectors.toSet());

				List<Long> missingIds = request.getServicesProvided().stream().filter(id -> !foundIds.contains(id))
						.collect(Collectors.toList());

				throw new ResourceNotFoundException("Services with IDs not found: " + missingIds);
			}

			vendor.setMyServices(new HashSet<>(foundServices));
		}

		// updating languages
		if (request.getLanguages() != null && !request.getLanguages().isEmpty()) {
			// getting the languages by names provided in request
			Set<Language> languages = new HashSet<>(languageRepo.findByLangNameIn(request.getLanguages()));

			// saving the languages for the specific user
			user.setLanguages(languages);
		}

		// getting the vendor banking details if not present then creating a new banking
		// record
		VendorBanking vendorBanking = vendorBankingRepo.findByMyVendorVendorId(vendorId).orElseGet(() -> {
			VendorBanking bankDetails = new VendorBanking();
			bankDetails.setMyVendor(vendor);
			return bankDetails;
		});

		// setting all the banking fields
		if (request.getAccountHolderName() != null) {
			vendorBanking.setHolderName(request.getAccountHolderName());
		}
		if (request.getAccountNumber() != null) {
			vendorBanking.setAccountNo(request.getAccountNumber());
		}
		if (request.getBankName() != null) {
			vendorBanking.setBankName(request.getBankName());
		}

		if (request.getBranchName() != null) {
			vendorBanking.setBranchName(request.getBranchName());
		}
		if (request.getIfscCode() != null) {
			vendorBanking.setIfscCode(request.getIfscCode());
		}

		// saving is required for new entity(banking details)
		vendorBankingRepo.save(vendorBanking);

		// saving the entire vendor details
		vendorRepository.save(vendor);
	}
}
