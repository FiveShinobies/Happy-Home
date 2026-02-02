package com.backend.happyhome.dtos;

import java.time.LocalDateTime;

import com.backend.happyhome.entities.Vendor;
import com.backend.happyhome.entities.enums.Priority;

import lombok.Data;

@Data
public class OrderDtoD {

    private AddressDto address;   // DTO
    private ServiceDtoC service;   // DTO (your existing one)
    private Long orderId;
    private Double price;
    private Priority priority;
    private LocalDateTime timeSlot;
    private Vendor myVendor;
}
