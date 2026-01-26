package com.DutyMatrix.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.DutyMatrix.dto.StationRegisterDTO;
import com.DutyMatrix.services.StationService;

import io.swagger.v3.oas.annotations.parameters.RequestBody;
import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/station")
@CrossOrigin(origins = "http://localhost:3000")

public class StationController {

	private final StationService stationService;
	
	@PostMapping("/add")
	public ResponseEntity<?> registerStation(@RequestBody StationRegisterDTO dto )
	{
		System.out.println("in station resister = "+dto);
		
		
		try {
		return ResponseEntity.status(HttpStatus.CREATED).body(stationService.registerStation(dto));
		}
		catch(RuntimeException e)
		{
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("station is not registered.");
		}
		
	}
}
