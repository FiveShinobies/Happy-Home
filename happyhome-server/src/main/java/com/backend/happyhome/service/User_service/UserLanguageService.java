package com.backend.happyhome.service.User_service;

import javax.management.AttributeNotFoundException;

import com.backend.happyhome.dtos.user_dto.AddLanguagesRequestD;
import com.backend.happyhome.dtos.user_dto.DeleteLanguagesRequestD;

public interface UserLanguageService {
	void addLanguages(Long userId, AddLanguagesRequestD request) throws Exception;
	void deleteLanguages(Long userId, DeleteLanguagesRequestD request) throws AttributeNotFoundException;
}
