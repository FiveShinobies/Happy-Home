package com.backend.happyhome.repository.support_repos;

import org.springframework.data.jpa.repository.JpaRepository;
import com.backend.happyhome.entities.ContactSupport;

public interface ContactSupportRepository
        extends JpaRepository<ContactSupport, Long> {
}
