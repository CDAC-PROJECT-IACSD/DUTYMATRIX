package com.DutyMatrix.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.DutyMatrix.dto.JwtUserDTO;
import com.DutyMatrix.dto.StationRegisterDTO;
import com.DutyMatrix.services.StationService;
import com.DutyMatrix.services.LoggerClient;

import io.swagger.v3.oas.annotations.parameters.RequestBody;
import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/station")
@CrossOrigin(origins = "http://localhost:5173")
public class StationController {

    private final StationService stationService;
    private final LoggerClient loggerClient;   // ✅ LOGGER

    // 🏢 ADD STATION
    @PreAuthorize("hasRole('COMMISSIONER')")
    @PostMapping("/add")
    public ResponseEntity<?> registerStation(
            @RequestBody StationRegisterDTO dto,
            @AuthenticationPrincipal JwtUserDTO user) {

        try {
            Object response = stationService.registerStation(dto);

            loggerClient.logAction(
                "STATION_CREATED",
                "Station created successfully",
                user.getUserId()
            );

            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(response);

        } catch (RuntimeException e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("station is not registered.");
        }
    }
}
