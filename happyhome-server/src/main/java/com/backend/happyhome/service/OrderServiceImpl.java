package com.backend.happyhome.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.backend.happyhome.audit.AuditAction;
import com.backend.happyhome.audit.annotation.Audit;
import com.backend.happyhome.controller.ConsumerController;
import com.backend.happyhome.custom_exceptions.CannotChangeTimeSlotException;
import com.backend.happyhome.custom_exceptions.ConsumerNotFoundException;
import com.backend.happyhome.custom_exceptions.OrderDoesNotExist;
import com.backend.happyhome.custom_exceptions.OrderDoesNotExistException;
import com.backend.happyhome.custom_exceptions.ReviewAlreadyExistsException;
import com.backend.happyhome.dto.OrderDTO;
import com.backend.happyhome.dtos.AddressDto;
import com.backend.happyhome.dtos.ConsumerReviewDTOA;
import com.backend.happyhome.dtos.OrderDtoC;
import com.backend.happyhome.dtos.OrderDtoD;
import com.backend.happyhome.dtos.PlaceOrderDTOA;
import com.backend.happyhome.dtos.ServiceDtoC;
import com.backend.happyhome.entities.Address;
import com.backend.happyhome.entities.Consumer;
import com.backend.happyhome.entities.ConsumerReview;
import com.backend.happyhome.entities.HouseholdService;
import com.backend.happyhome.entities.Order;
import com.backend.happyhome.entities.enums.Status;
import com.backend.happyhome.repository.AddressRepo;
import com.backend.happyhome.repository.ConsumerRepo;
import com.backend.happyhome.repository.ConsumerReviewRepo;
import com.backend.happyhome.repository.HouseholdServiceRepo;
import com.backend.happyhome.repository.OrderRepo;
import com.backend.happyhome.repository.consumer_repos.ConsumerTransactionRepo;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

	private final OrderRepo orderRepo;

	private final ConsumerReviewRepo crRepo;

	private final ConsumerRepo consumerRepo;

	private final HouseholdServiceRepo serviceRepo;

	private final AddressRepo addressRepo;

	private final ConsumerTransactionRepo ctRepo;

	@Override
	public List<OrderDtoD> getIncomingOrderRequest() {

		List<Order> orders = orderRepo.findByStatus(Status.UNASSIGNED);

		if (orders == null || orders.isEmpty()) {
			return Collections.emptyList();
		}

		List<OrderDtoD> result = new ArrayList<>();

		for (Order o : orders) {

			OrderDtoD dto = new OrderDtoD();

			// ✅ Address → AddressDtoC
			if (o.getOrderAddress() != null) {
				Address a = addressRepo
						.findById(o.getOrderAddress().getAddressId())
						.orElse(null);

				if (a != null) {
					AddressDto ad = new AddressDto();
					ad.setTown(a.getTown());
					ad.setCity(a.getCity());
					ad.setPincode(a.getPincode());
					dto.setAddress(ad);
				}
			}

			// ✅ HouseholdService → ServiceDtoC (USING YOUR DTO)
			if (o.getMyServices() != null) {
				HouseholdService s = serviceRepo
						.findById(o.getMyServices().getServiceId())
						.orElse(null);

				if (s != null) {
					ServiceDtoC sd = new ServiceDtoC();
					sd.setCategory(s.getCategory());
					sd.setServiceName(s.getServiceName());
					dto.setService(sd);
				}
			}

			dto.setPrice(o.getOrderPrice());
			dto.setPriority(o.getPriority());
			dto.setTimeSlot(o.getTimeSlot());
			dto.setOrderId(o.getOrderId());
			result.add(dto);
		}

		return result;
	}

	@Override
	public OrderDTO getOngoingOrders(Long oId) {
		Order o = orderRepo.findById(oId).orElseThrow(() -> new OrderDoesNotExist());
		return ConsumerController.mapToOrderDTO(o);
	}

	public Address getAddress(Long oId) {
		Order order = orderRepo.findById(oId).orElseThrow(() -> new OrderDoesNotExist());

		return order.getOrderAddress();
	}

	@Override
	public Consumer getConsumer(Long oId) {
		Order order = orderRepo.findById(oId).orElseThrow(() -> new OrderDoesNotExist());

		return order.getMyConsumer();
	}

	@Override
	public boolean updateStatusToInProgress(Long oId) {
		Order order = orderRepo.findById(oId).orElseThrow(() -> new OrderDoesNotExist());

		order.setStatus(Status.INPROGRESS);

		return true;
	}

	@Override
	public boolean updateStatusToCompleted(Long oId) {
		Order order = orderRepo.findById(oId).orElseThrow(() -> new OrderDoesNotExist());

		order.setStatus(Status.COMPLETED);

		return true;
	}

	@Override
	public List<Order> getOrdersByConsumerId(Long cid) {
		return orderRepo.findByMyConsumerConsumerId(cid);
	}

	@Override
	public Order getOrderDetailsById(Long oid) {
		return orderRepo.findById(oid).orElse(null);
	}

	@Override
	public Order changeTimeSlot(Long oid, LocalDateTime updatedTime) {

		Order o = orderRepo.findById(oid).orElseThrow(() -> new OrderDoesNotExist());

		if (o.getStatus() != Status.UNASSIGNED) {
			throw new CannotChangeTimeSlotException("TIme Slot cannot be changed as order is already " + o.getStatus());
		}

		o.setOrderDateTime(updatedTime);
		orderRepo.save(o);
		return o;
	}

	@Override
	public ConsumerReview addConsumerReviewForAnOrder(Long oid, ConsumerReviewDTOA cr) {

		if (orderRepo.findById(oid).orElse(null) == null) {
			throw new OrderDoesNotExistException("Order Does not Exist!!");
		}

		if (crRepo.findByMyOrderOrderId(oid) != null) {
			throw new ReviewAlreadyExistsException("Review Already Exists!!");
		}

		Order odr = orderRepo.findById(oid).orElseThrow(() -> new OrderDoesNotExist());
		ConsumerReview cf = new ConsumerReview();
		cf.setDescription(cr.getDescription());
		cf.setRating(cr.getRating());
		cf.setMyOrder(odr);

		crRepo.save(cf);

		return cf;
	}

	@Override
	@Audit(action = AuditAction.BOOKING_CREATED)
	public Order addOrder(PlaceOrderDTOA reqOdr) {

		Order newOdr = new Order();

		Consumer c = consumerRepo.findById(reqOdr.getConsumerId()).orElseThrow(() -> new ConsumerNotFoundException());

		HouseholdService s = serviceRepo.findById(reqOdr.getServiceId()).orElseThrow();

		Address a = addressRepo.findById(reqOdr.getAddressId()).orElseThrow();

		newOdr.setMyConsumer(c);
		newOdr.setMyServices(s);
		newOdr.setOrderAddress(a);
		newOdr.setTimeSlot(reqOdr.getTimeSlot());
		newOdr.setOrderPrice(reqOdr.getOrderPrice());
		newOdr.setStatus(Status.UNASSIGNED);
		newOdr.setPriority(reqOdr.getPriority());

		return orderRepo.save(newOdr);
	}

	@Override
	public List<Order> getAllOrders() {
		return orderRepo.findAll();
	}

}
