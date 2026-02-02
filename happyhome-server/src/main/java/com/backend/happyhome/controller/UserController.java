package com.backend.happyhome.controller;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.happyhome.dtos.ConsumerRegisterDtoC;
import com.backend.happyhome.dtos.LoginResponseDtoC;
import com.backend.happyhome.dtos.UserLoginDtoC;
import com.backend.happyhome.dtos.VendorRegisterDtoC;
import com.backend.happyhome.dtos.user_dto.UserPasswordChangeDTOA;
import com.backend.happyhome.entities.User;
import com.backend.happyhome.entities.enums.UserRole;
import com.backend.happyhome.security.JwtUtil;
import com.backend.happyhome.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/")
@RequiredArgsConstructor
public class UserController {

	private final UserService userService;
	private final AuthenticationManager authenticationManager;
	private final JwtUtil jwtUtil;
	
	
	@PostMapping("/login")		
	ResponseEntity<LoginResponseDtoC> login(@RequestBody UserLoginDtoC userDto){
		 Authentication auth = authenticationManager.authenticate(
			        new UsernamePasswordAuthenticationToken(
			            userDto.getEmail(),
			            userDto.getPassword()
			        )
			    );
		 User user = (User) auth.getPrincipal();
		 String Token = jwtUtil.generateToken(auth);
		 
		HttpHeaders headers = new HttpHeaders();
		headers.add(HttpHeaders.AUTHORIZATION,"Bearer " + Token);
		headers.add("Role", user.getRole().toString());
		ResponseEntity<LoginResponseDtoC> res = new ResponseEntity<LoginResponseDtoC>(new LoginResponseDtoC("Success",userService.giveRespectiveId(user.getUserId())), headers, HttpStatus.OK);
		return res;

	}
	
	
	@PostMapping("/signup/consumer")
	ResponseEntity<String> signup(@RequestBody ConsumerRegisterDtoC user){
		userService.registerConsumerUser(user);
		return new ResponseEntity<String>("Consumer Added",HttpStatus.CREATED);
	}
	
	@PostMapping("/signup/vendor")
	ResponseEntity<String> signup(@RequestBody VendorRegisterDtoC user){
		userService.registerVendorUser(user);
		return new ResponseEntity<String>("Vendor Added",HttpStatus.CREATED);
	}
	
	@PutMapping("/user/{id}/password")
	ResponseEntity<?> changePassword(@PathVariable Long id , @RequestBody UserPasswordChangeDTOA userInfo){
		System.out.println(id + "  " + userInfo.getNewPassword() + " "  + userInfo.getRole());
		userService.changePassword(id, userInfo.getNewPassword() , UserRole.valueOf(userInfo.getRole()));
		
		return ResponseEntity.ok("password changed");
	}
	
}

