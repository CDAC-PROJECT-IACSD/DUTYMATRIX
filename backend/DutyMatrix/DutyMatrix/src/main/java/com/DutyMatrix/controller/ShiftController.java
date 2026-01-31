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
import com.DutyMatrix.dto.ShiftResponseDTO;
import com.DutyMatrix.services.ShiftService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/shifts")
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class ShiftController {

    private final ShiftService shiftService;

    // Only STATION_INCHARGE can create shifts
    @PreAuthorize("hasRole('STATION_INCHARGE')")
    @PostMapping
    public ResponseEntity<ShiftResponseDTO> createShift(
            @RequestBody ShiftRequestDTO dto,
            @AuthenticationPrincipal JwtUserDTO user) {

        // user info comes from JWT
        String response =
                shiftService.createShift(dto, user.getUserId());

        return null;
    }
}
