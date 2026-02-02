package com.backend.happyhome.audit.model;

import java.time.LocalDateTime;

import com.backend.happyhome.audit.AuditAction;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "audit_logs")
@Data
public class AuditLog {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	
	private String username;
	private String role;
	
	private AuditAction action;
	private String className;
	private String methodName;
	
	private long ExecutionTimeMs;
	private boolean success;
	
	private String requestUri;
	private String httpMethod;
	private String ipAddress;
	
	@Column(columnDefinition = "TEXT")
	private String errorMessage;
	
	private LocalDateTime timestamp;
	
}
