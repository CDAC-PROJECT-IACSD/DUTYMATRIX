package com.DutyMatrix.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.DutyMatrix.dto.ApiResponse;
import com.DutyMatrix.dto.JwtUserDTO;
import com.DutyMatrix.dto.UserRegisterDTO;
import com.DutyMatrix.services.UserService;
import com.DutyMatrix.services.LoggerClient;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/users")
@AllArgsConstructor
public class UserController {

    private final UserService userService;
    private final LoggerClient loggerClient;   // ✅ LOGGER

    // 👮 USER SIGNUP
    @PostMapping("/signup")
    public ResponseEntity<?> registerStudent(
            @Valid @RequestBody UserRegisterDTO dto) {

        Long userId = userService.registerUser(dto); // ✅ returns userId

        // ✅ SAFE LOGGER CALL
        try {
            loggerClient.logAction(
                "PROFILE_UPDATED",
                "User registered successfully",
                userId
            );
        } catch (Exception e) {
            System.out.println("Logger service unavailable, skipping signup log");
        }

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(new ApiResponse("User Created Successfully", "Success"));
    }

    @GetMapping("/station/{stationId}")
    public ResponseEntity<?> listByStation(@PathVariable Long stationId) {
        return ResponseEntity.ok(
                userService.getOfficersByStation(stationId)
        );
    }

    @PreAuthorize("hasRole('STATION_INCHARGE')")
    @GetMapping("/station-incharge/officers")
    public ResponseEntity<?> getOfficersForStationIncharge(
            @AuthenticationPrincipal JwtUserDTO jwtUser) {

        return ResponseEntity.ok(
                userService.getOfficersByStation(jwtUser.getStationId())
        );
    }
}
