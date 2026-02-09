package com.DutyMatrix.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.DutyMatrix.dto.JwtUserDTO;
import com.DutyMatrix.dto.ShiftRequestDTO;
import com.DutyMatrix.services.ShiftService;
import com.DutyMatrix.services.LoggerClient;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/shifts")
@AllArgsConstructor
public class ShiftController {

    private final ShiftService shiftService;
    private final LoggerClient loggerClient;   // ✅ ADD LOGGER

    // Only STATION_INCHARGE can create shifts
    @PostMapping
    @PreAuthorize("hasRole('STATION_INCHARGE')")
    public ResponseEntity<String> createShift(
            @RequestBody ShiftRequestDTO dto,
            @AuthenticationPrincipal JwtUserDTO user) {

        // 1️⃣ CREATE SHIFT
        String response = shiftService.createShift(dto, user.getUserId());

        // 2️⃣ LOG SHIFT CREATION
        loggerClient.logAction(
            "SHIFT_CREATED",
            "Shift created successfully",
            user.getUserId()
        );

        return ResponseEntity.ok(response);
    }
}
