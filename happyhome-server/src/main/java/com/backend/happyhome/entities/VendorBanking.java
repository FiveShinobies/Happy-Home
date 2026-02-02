package com.backend.happyhome.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "vendor_banking")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class VendorBanking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "banking_id")
    private Long bankingId;
    
    @Column(name = "ifsc_code")
    private String ifscCode;

    @Column(name = "account_no", nullable = false, unique = true)
    private String accountNo;

    @Column(name = "bank_name", nullable = false)
    private String bankName;

    @Column(name = "branch_name")
    private String branchName;

    @Column(name = "holder_name", nullable = false)
    private String holderName;

    @OneToOne
    @JoinColumn(name = "vendor_id", unique = true)
    private Vendor myVendor;

    
    
}
