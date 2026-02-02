package com.backend.happyhome.entities;

import java.time.LocalDateTime;

import com.backend.happyhome.entities.enums.TransactionStatus;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name="vendor_transaction")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@EqualsAndHashCode
public class VendorTransaction {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "vendor_transaction_id")
	private Long vendorTransactionId;
	
	@OneToOne
	@JoinColumn(name="order_id" , nullable = false)
	private Order orderId;
	
	@Column(name = "amount", nullable = false)
	private Double amount;
	
	@Enumerated(EnumType.STRING)
	@Column(name = "status", nullable = false)
	private TransactionStatus status;
	
	@Column(name = "timestamp")
	private LocalDateTime timestamp;
}