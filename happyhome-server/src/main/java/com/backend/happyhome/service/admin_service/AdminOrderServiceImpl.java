package com.backend.happyhome.service.admin_service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.backend.happyhome.controller.ConsumerController;
import com.backend.happyhome.custom_exceptions.OrderDoesNotExistException;
import com.backend.happyhome.dto.OrderDTO;
import com.backend.happyhome.dtos.support_dto.AdminDashboardDTOA;
import com.backend.happyhome.dtos.user_dto.UserDTOA;
import com.backend.happyhome.entities.Order;
import com.backend.happyhome.entities.User;
import com.backend.happyhome.repository.OrderRepo;
import com.backend.happyhome.repository.UserRepo;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class AdminOrderServiceImpl implements AdminOrderService {

	private final OrderRepo orderRepo;
	private final UserRepo userRepo;
	
	
	@Override
	public List<Order> getAllOrders() {
		return orderRepo.findAll();
	}

	@Override
	public Order getOrderDetailsById(Long oid) {
		return orderRepo.findById(oid).orElseThrow(() -> new OrderDoesNotExistException("OrderNotFound -- admin service"));
	}

	@Override
	public AdminDashboardDTOA getDashboardData() {
	
		AdminDashboardDTOA res = new AdminDashboardDTOA();
		
		List<OrderDTO> list = new ArrayList<>();;
		
		for(Order o : orderRepo.findAll()) {
			list.add(ConsumerController.mapToOrderDTO(o));
		}
		
		res.setOrders(list);
		
		List<UserDTOA> users = new ArrayList<>();
		
		for(User u : userRepo.findAll()) {
			users.add(AdminOrderServiceImpl.toDashboardDTO(u));
		}
		
		res.setUsers(users);
		
		return res;
	}
	
	
	public static UserDTOA toDashboardDTO(User user) {

		UserDTOA dto = new UserDTOA();

	    dto.setUserId(user.getUserId());
	    dto.setFirstName(user.getFirstName());
	    dto.setLastName(user.getLastName());
	    dto.setEmail(user.getEmail());
	    dto.setPhone(user.getPhone());
	    dto.setRole(user.getRole());
	    dto.setUserStatus(user.getUserStatus());
	    dto.setDob(user.getDob());

	    return dto;
	}

	
	
	
}
