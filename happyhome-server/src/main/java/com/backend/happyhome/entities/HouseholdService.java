package com.backend.happyhome.entities;

import java.util.HashSet;
import java.util.Set;

import com.backend.happyhome.entities.enums.Category;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name="services")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString(exclude = {"myVendors", "myOrders"})
@EqualsAndHashCode(of = "serviceId")
public class HouseholdService {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="service_id")
	private Long serviceId;

	@Column(name="service_name",nullable = false, unique = true)
	private String serviceName;
	
	@Column(name="short_desc",nullable = false)
	private String shortDesc;
	
	@Lob
	@Column(name="long_desc",columnDefinition="TEXT",nullable = false)
	private String LongDesc;
	
	@Column(name="price",nullable = false)
	private Double price;
	
	@Enumerated(EnumType.STRING)
	@Column(name="category",nullable = false)
	private Category category;

	@Column(name="active",nullable = false)
	private boolean active = true;
	
	
	@ManyToMany(mappedBy = "myServices")
	private Set<Vendor> myVendors = new HashSet<>();

	@OneToMany(
			mappedBy = "myServices",
			cascade = CascadeType.ALL,
		    orphanRemoval = true)
	private Set<Order> myOrders = new HashSet<>();
	
	
}
