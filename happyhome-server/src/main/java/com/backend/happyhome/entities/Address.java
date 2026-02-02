package com.backend.happyhome.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "address")
@Data
public class Address {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "address_id")
	private Long addressId;
	
	@ManyToOne
	@JoinColumn(name = "user_id", nullable = false)
	private User myUser;
	
	@Column(name = "home_no", length = 100)
	private String homeNo;
	
	@Column(name = "town", length = 100)
	private String town;
	
	@Column(name = "city", length = 100)
	private String city;
	
	@Column(name = "state", length = 100)
	private String state;
	
	@Column(name = "pincode", length = 10)
	private String pincode;
}
