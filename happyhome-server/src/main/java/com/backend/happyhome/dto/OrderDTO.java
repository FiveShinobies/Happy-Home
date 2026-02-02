package com.backend.happyhome.dto;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class OrderDTO {

    // Order
    private Long orderId;
    private LocalDateTime orderDateTime;
    private LocalDateTime timeSlot;
    private Double orderPrice;
    private String status;        // Status enum → String
    private String priority;      // Priority enum → String

    // Consumer
    private Long consumerId;

    // Vendor
    private Long vendorId;
    private String vendorFirstName;
    private String vendorLastName;
    private String vendorPhone;
    private Integer vendorExperience;

    // Service
    private Long serviceId;
    private String serviceName;
    private String serviceShortDesc;
    private Double servicePrice;

    // Address
    private Long addressId;
    private String homeNo;
    private String town;
    private String city;
    private String state;
    private String pincode;

    // Payment
    private String paymentStatus; // TransactionStatus enum → String
    private String paymentId;

    // Review
    private Integer rating;
    private String reviewDescription;
}
