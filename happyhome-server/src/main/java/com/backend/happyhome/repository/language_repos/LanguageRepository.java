package com.backend.happyhome.repository.language_repos;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.happyhome.entities.Language;

public interface LanguageRepository extends JpaRepository<Language, Long>{

	Optional<Language> findByLangName(String langName);
}
