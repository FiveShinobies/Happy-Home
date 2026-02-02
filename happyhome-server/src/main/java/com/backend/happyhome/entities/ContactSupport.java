package com.backend.happyhome.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "contact_support")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ContactSupport {
	 @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    @Column(name = "contact_id")
	    private Long contactId;

	    @Column(name = "name", nullable = false)
	    private String name;

	    @Column(name = "email", nullable = false)
	    private String email;

	    @Column(name = "category")
	    private String category;

	    @Column(name = "description", columnDefinition = "TEXT")
	    private String description;

}
