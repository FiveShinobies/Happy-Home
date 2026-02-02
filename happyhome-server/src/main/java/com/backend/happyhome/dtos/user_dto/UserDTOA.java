package com.backend.happyhome.dtos.user_dto;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Set;

import com.backend.happyhome.entities.Language;
import com.backend.happyhome.entities.enums.UserRole;
import com.backend.happyhome.entities.enums.UserStatus;

import lombok.Data;

@Data
public class UserDTOA {

    private Long userId;

    private String firstName;
    private String lastName;

    private String email;
    private String phone;

    private UserRole role;
    private UserStatus userStatus;

    private LocalDate dob;

}
