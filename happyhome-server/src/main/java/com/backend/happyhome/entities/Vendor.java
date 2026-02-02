package com.backend.happyhome.entities;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "vendor")
@Data
public class Vendor {
	@Id
	@Column(name = "vendor_id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long vendorId;
	
	@OneToOne
	@JoinColumn(name = "user_id", nullable = false, unique = true)
	private User myUser;
	
	@Column(name = "aadhar_no", nullable = false, unique = true, length = 15)
	private String aadharNo; 
	
	@Column(name = "pan_no", nullable = false, unique = true, length = 15)
	private String panNo;
	
	@Column(name = "experience", nullable = false)
	private Integer experience;

	@ManyToMany(cascade=CascadeType.MERGE)
	@JoinTable(name = "vendor_service" , joinColumns = @JoinColumn(name = "vendor_id") , inverseJoinColumns = @JoinColumn(name = "service_id"))
	private Set<HouseholdService> myServices = new HashSet<>();
	
}
