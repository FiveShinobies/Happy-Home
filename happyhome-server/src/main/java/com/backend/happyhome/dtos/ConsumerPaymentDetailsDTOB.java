package com.backend.happyhome.dtos;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ConsumerPaymentDetailsDTOB {

	private List<PaymentCardDTOB> cards;
	private List<PaymentUpiDTOB> upis;
}
