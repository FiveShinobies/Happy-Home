package com.backend.happyhome.dtos.user_dto;

import java.util.Set;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DeleteLanguagesRequestD {

    @NotEmpty(message = "Languages cannot be empty")
    private Set<@NotBlank String> languages;
}

