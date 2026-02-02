package com.backend.happyhome.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Entity
@Table(name = "user_images")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class UserImage {
	
 @Id
 @Column(name = "img_id")
 @GeneratedValue(strategy = GenerationType.IDENTITY)
 private Long imgId;
 
 @Lob
 @Column(name = "image")
 private byte[] image;
 
 @OneToOne
 @JoinColumn(name = "user_id", unique = true,nullable = false)
 private User myUser;
 
	
}
