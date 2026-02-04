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
import com.backend.happyhome.service.NotificationService;
import com.backend.happyhome.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/")
@RequiredArgsConstructor
public class UserController {

	private final UserService userService;
	private final AuthenticationManager authenticationManager;
	private final JwtUtil jwtUtil;
	private final NotificationService notificationService ;
	
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
		
		String subject = "Welcome to HappyHome 🎉 Your Account Is Ready";
		String message =
		        "Hello " + user.getFirstName() + " " + user.getLastName() + ",\n\n" +
		        "Welcome to HappyHome! 🎉\n\n" +
		        "Your account has been successfully created, and you’re all set to start booking services with trusted vendors.\n\n" +
		        "What you can do next:\n" +
		        "- Browse available services\n" +
		        "- Place service requests\n" +
		        "- Track your orders in real time\n\n" +
		        "If you need any help getting started, our support team is always here for you.\n\n" +
		        "We’re excited to have you with us!\n\n" +
		        "Warm regards,\n" +
		        "HappyHome Team";

		notificationService.sendEmail(user.getEmail(), subject, message);
		
		
		return new ResponseEntity<String>("Consumer Added",HttpStatus.CREATED);
	}
	
	@PostMapping("/signup/vendor")
	ResponseEntity<String> signup(@RequestBody VendorRegisterDtoC user){
		userService.registerVendorUser(user);
		
		// welcome email
		String subject = "Welcome to HappyHome 🎉 You’re Now a Verified Vendor";
		String message =
		        "Hello " + user.getFirstName() + " " + user.getLastName() + ",\n\n" +
		        "Welcome to HappyHome! 🎉\n\n" +
		        "Your vendor account has been successfully created. You can now start receiving work requests from customers.\n\n" +
		        "Next steps:\n" +
		        "- Log in to your vendor dashboard\n" +
		        "- Accept work requests\n" +
		        "- Track earnings and wallet balance\n\n" +
		        "We’re excited to have you onboard and look forward to working together.\n\n" +
		        "If you have any questions, feel free to reach out to our support team.\n\n" +
		        "Best regards,\n" +
		        "HappyHome Team";
		notificationService.sendEmail( user.getEmail(), subject, message);
		return new ResponseEntity<String>("Vendor Added",HttpStatus.CREATED);
	}
	
	@PutMapping("/user/{id}/password")
	ResponseEntity<?> changePassword(@PathVariable Long id , @RequestBody UserPasswordChangeDTOA userInfo){
		System.out.println(id + "  " + userInfo.getNewPassword() + " "  + userInfo.getRole());
		userService.changePassword(id, userInfo.getNewPassword() , UserRole.valueOf(userInfo.getRole()));
		
		return ResponseEntity.ok("password changed");
	}
	
}

