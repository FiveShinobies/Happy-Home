package com.backend.happyhome.entities;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name="service_images")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@EqualsAndHashCode
public class ServiceImage {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="service_image_id")
	private Long serviceImageId;
	
	@ManyToOne
	@JoinColumn(name="service_id",nullable=false)
	private HouseholdService myService;
	
	
  @Column(name = "image", columnDefinition = "LONGBLOB")
  @Lob
  private byte[] image;
	
}
