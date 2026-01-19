package com.DutyMatrix.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.DutyMatrix.dto.UserRegisterDTO;
import com.DutyMatrix.services.UserService;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/users")
@AllArgsConstructor
public class UserController {
	private final UserService userService;
	
	@PostMapping("/signup")
	public ResponseEntity<?> registerStudent(@RequestBody UserRegisterDTO dto){
		System.out.println("in student resister = "+dto);
		
		try {
			return ResponseEntity.status(HttpStatus.CREATED).body(userService.registerUser(dto));
		} catch (RuntimeException e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("user not registered");
		}
	}
}
