package com.backend.happyhome.dtos;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class VendorBankingResponseDTOE {
	private String bankName;
    private String branchName;
    private String ifscCode;
    private String accountNo;   
    private String holderName;
    private String upiId;
}
