package com.DutyMatrix.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.DutyMatrix.dto.ApiResponse;
import com.DutyMatrix.dto.UserRegisterDTO;
import com.DutyMatrix.services.UserService;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/users")
@AllArgsConstructor
public class UserController {
	private final UserService userService;
	
	@PostMapping("/signup")
	public ResponseEntity<?> registerStudent(@Valid @RequestBody UserRegisterDTO dto){
		System.out.println("in police resister = "+dto);
		
		userService.registerUser(dto);
			return ResponseEntity.status(HttpStatus.CREATED).body(new ApiResponse("User Created Successfully","Success"));
		
	}
	
	
	@GetMapping("/station/{stationId}")
	public ResponseEntity<?> listByStation(@PathVariable Long stationId) {
	    return ResponseEntity.ok(userService.getOfficersByStation(stationId));
	}
}
