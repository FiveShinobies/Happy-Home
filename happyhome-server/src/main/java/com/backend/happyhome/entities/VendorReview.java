package com.backend.happyhome.entities;

import org.hibernate.validator.constraints.Range;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;


@Entity
@Table(name="vendor_review")
@ToString
@Getter
@Setter
public class VendorReview {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="vendor_review")
	private Long vendorReviewId;
	
	@JoinColumn(name = "order_id" ,  nullable = false)
	@OneToOne
	private Order myOrder; 
	
	@Column(name = "rating")
	@Range( min = 1 , max = 5 , message = "Rating must be between 1 and 5")
	private Integer rating;
	
	@Lob
	@Column(name = "description")
	private String description;
	
}


