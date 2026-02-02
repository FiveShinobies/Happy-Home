package com.backend.happyhome.repository;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.happyhome.entities.Language;

public interface LanguageRepo extends JpaRepository<Language, Long> {


	List<Language> findByUsersUserId(Long userId);
	List<Language> findByLangNameIn(Set<String> langNames);
	

	
	Optional<Language> findByLangName(String langName);

}
