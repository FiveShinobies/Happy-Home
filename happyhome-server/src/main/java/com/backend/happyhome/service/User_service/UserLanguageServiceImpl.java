package com.backend.happyhome.service.User_service;

import java.util.Set;

import javax.management.AttributeNotFoundException;

import org.springframework.stereotype.Service;

import com.backend.happyhome.dtos.user_dto.AddLanguagesRequestD;
import com.backend.happyhome.dtos.user_dto.DeleteLanguagesRequestD;
import com.backend.happyhome.entities.Language;
import com.backend.happyhome.entities.User;
import com.backend.happyhome.repository.language_repos.LanguageRepository;
import com.backend.happyhome.repository.user_repos.UserRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class UserLanguageServiceImpl implements UserLanguageService{
	
	private final UserRepository userRepository;
	private final LanguageRepository languageRepository;

	@Override
	public void addLanguages(Long userId, AddLanguagesRequestD request) throws Exception {

	    User user = userRepository.findById(userId)
	            .orElseThrow(() -> new AttributeNotFoundException("User not found"));

	    Set<String> langs = request.getLanguages();

	    // default language
	    if (langs == null || langs.isEmpty()) {
	        langs = Set.of("Hindi");
	    }

	    for (String langName : langs) {

	        String normalized = langName.trim();

	        Language language = languageRepository
	                .findByLangName(normalized)
	                .orElseGet(() -> {
	                    Language newLang = new Language();
	                    newLang.setLangName(normalized);
	                    return languageRepository.save(newLang);
	                });

	        user.getLanguages().add(language);
	    }

	    userRepository.save(user);
	}

	
	
	@Override
	public void deleteLanguages(Long userId, DeleteLanguagesRequestD request)
	        throws AttributeNotFoundException {

	    User user = userRepository.findById(userId)
	            .orElseThrow(() -> new AttributeNotFoundException("User not found"));

	    Set<Language> userLanguages = user.getLanguages();

	    for (String langName : request.getLanguages()) {

	        String normalized = langName.trim();

	        languageRepository.findByLangName(normalized)
	                .ifPresent(userLanguages::remove);
	    }

	    userRepository.save(user);
	}


	

}
