package com.backend.happyhome.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.happyhome.audit.model.AuditLog;

public interface AuditRepository extends JpaRepository<AuditLog, Long> {

}
