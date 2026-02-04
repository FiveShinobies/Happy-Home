package com.backend.happyhome.dto;

import java.util.HashMap;

import lombok.Data;

@Data
public class NotificationRequestDto {

	private int type = 0;       
    private String to;         
    private String subject;
    private String message;
	private HashMap<String , String> metadata = new HashMap<>();
}
