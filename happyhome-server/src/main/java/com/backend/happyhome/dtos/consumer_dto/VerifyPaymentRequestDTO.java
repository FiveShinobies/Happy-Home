package com.backend.happyhome.dtos.consumer_dto;

import com.backend.happyhome.dtos.PlaceOrderDTOA;
import com.backend.happyhome.dtos.RazorpayPaymentDTOA;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class VerifyPaymentRequestDTO {

    @NotNull
    private RazorpayPaymentDTOA payment;

    @NotNull
    private PlaceOrderDTOA order;
}
