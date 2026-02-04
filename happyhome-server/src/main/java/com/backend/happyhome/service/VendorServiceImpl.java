package com.backend.happyhome.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.backend.happyhome.audit.AuditAction;
import com.backend.happyhome.audit.annotation.Audit;
import com.backend.happyhome.controller.ConsumerController;
import com.backend.happyhome.custom_exceptions.OrderDoesNotExist;
import com.backend.happyhome.custom_exceptions.OrderDoesNotExistException;
import com.backend.happyhome.custom_exceptions.VendorDoesNotExistException;
import com.backend.happyhome.dto.OrderDTO;
import com.backend.happyhome.dtos.OrderDtoC;
import com.backend.happyhome.dtos.vendor_dto.VendorDashboardDTOA;
import com.backend.happyhome.entities.Address;
import com.backend.happyhome.entities.ConsumerTransaction;
import com.backend.happyhome.entities.Order;
import com.backend.happyhome.entities.User;
import com.backend.happyhome.entities.Vendor;
import com.backend.happyhome.entities.VendorReview;
import com.backend.happyhome.entities.VendorTransaction;
import com.backend.happyhome.entities.VendorWallet;
import com.backend.happyhome.entities.enums.Status;
import com.backend.happyhome.entities.enums.TransactionStatus;
import com.backend.happyhome.repository.OrderRepo;
import com.backend.happyhome.repository.VendorRepo;
import com.backend.happyhome.repository.consumer_repos.ConsumerTransactionRepo;
import com.backend.happyhome.repository.vendor_repos.VendorTransactionRepo;
import com.backend.happyhome.repository.vendor_repos.VendorWalletRepo;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class VendorServiceImpl implements VendorService{

	private final OrderRepo orderRepo;
	private final VendorRepo vendorRepo;
	private final ConsumerTransactionRepo ctRepo;
	private final VendorTransactionRepo vtRepo;
	private final VendorWalletRepo vwRepo;
	private final NotificationService notificationService;
	
	@Override
	public boolean acceptRequest(Long oId, Long vId) throws OrderDoesNotExist{
		Order order = orderRepo.findById(oId).orElseThrow(()-> new OrderDoesNotExist());
		Vendor vendor = vendorRepo.findById(vId).orElseThrow(()-> new VendorDoesNotExistException());
		
		order.setMyVendor(vendor);
		order.setStatus(Status.ASSIGNED);
		orderRepo.save(order);
		return true;
	}

	@Override
	public VendorReview getReview(Long oId) {
		Order order = orderRepo.findById(oId).orElseThrow(()-> new OrderDoesNotExist());
		
		return order.getMyVendorReview();
	}

	@Override
	public OrderDtoC getOrderOfVendor(Long oId) {
		Order order = orderRepo.findById(oId).orElseThrow(()-> new OrderDoesNotExist());
		
		OrderDtoC orderDto = new OrderDtoC();
		orderDto.setAddress(order.getOrderAddress());
		orderDto.setMyVendor(order.getMyVendor());
		orderDto.setPrice(order.getOrderPrice());
		orderDto.setPriority(order.getPriority());
		orderDto.setTimeSlot(order.getTimeSlot());
		
		return orderDto;
	}

	@Override
	public Address getAddressOfOrder(Long oId) {
		Order order = orderRepo.findById(oId).orElseThrow(()-> new OrderDoesNotExist());
		
		Address address = order.getOrderAddress();
		
		return address;
	}

	@Override
	@Audit(action = AuditAction.PAYMENT_SUCCESS)
	public boolean payVendor(Long oid) {
		ConsumerTransaction ct = ctRepo.findByOrderIdOrderId(oid);
		Order o = orderRepo.findById(oid).orElseThrow(()-> new OrderDoesNotExistException("Order Not Found"));
		Vendor v = vendorRepo.findById(o.getMyVendor().getVendorId()).orElseThrow(() -> new VendorDoesNotExistException());

		VendorTransaction vt = new VendorTransaction();
		vt.setOrderId(o);
		vt.setAmount(ct.getAmount()*0.9); //10% our cut
		vt.setStatus(TransactionStatus.SUCCESS);
		vt.setTimestamp(LocalDateTime.now());
		
		vt = vtRepo.save(vt);
		
		VendorWallet vw = vwRepo.findByMyVendorVendorId(v.getVendorId()); 
		vw.setBalance( vw.getBalance() + vt.getAmount());
		boolean result = (vwRepo.save(vw) != null);
		
		User user = v.getMyUser();
		
		if(result) {
			
			String subject = "Payment Credited to Your Wallet";
			String message =
			        "Hello " + user.getFirstName() + " " + user.getLastName() + ",\n\n" +
			        "We’re happy to inform you that a payment has been successfully credited to your vendor wallet.\n\n" +
			        "Transaction Details:\n" +
			        "Order ID: " + o.getOrderId() + "\n" +
			        "Credited Amount: ₹" + vt.getAmount() + "\n" +
			        "Date & Time: " + vt.getTimestamp() + "\n\n" +
			        "This amount is now available in your wallet and can be viewed from your vendor dashboard.\n\n" +
			        "If you have any questions, feel free to contact our support team.\n\n" +
			        "Thank you for partnering with us.\n\n" +
			        "Regards,\n" +
			        "HappyHome Team";
			
			notificationService.sendEmail(user.getEmail(), subject, message);
			
		}
		
		return result;
	}

	@Override
	public VendorWallet getWallet(Long vid) {
		return vwRepo.findByMyVendorVendorId(vid);		
	}

	@Override
	public VendorDashboardDTOA dashboardData(Long vid) {
		
		vendorRepo.findById(vid).orElseThrow(()-> new VendorDoesNotExistException());
		List<Order> orders = orderRepo.findByMyVendorVendorId(vid);
		List<OrderDTO> orderDtoList = new ArrayList<>();
		Double amt = vwRepo.findByMyVendorVendorId(vid).getBalance();
		for(Order o : orders) {			
			orderDtoList.add(ConsumerController.mapToOrderDTO(o));
		}
		
		VendorDashboardDTOA res = new VendorDashboardDTOA();
		res.setOrder(orderDtoList);
		res.setBalance(amt);
		return res;
	}
	
	
	
	
	
}
