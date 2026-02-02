package com.backend.happyhome.service.admin_service;

import java.util.List;

import com.backend.happyhome.dtos.support_dto.AdminDashboardDTOA;
import com.backend.happyhome.entities.Order;

public interface AdminOrderService {

	List<Order> getAllOrders();
	
	Order getOrderDetailsById(Long oid);

	AdminDashboardDTOA getDashboardData();
	
}

//	getAllOrders
//	getOrderDetailsById
//	viewOrderFeedBacks