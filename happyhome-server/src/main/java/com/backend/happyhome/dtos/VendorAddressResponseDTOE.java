package com.backend.happyhome.dtos;

import lombok.Getter;
import lombok.Setter;

@Getter 
@Setter
public class VendorAddressResponseDTOE {
    private String homeNo;
    private String city;
    private String state;
    private String pincode;
}
