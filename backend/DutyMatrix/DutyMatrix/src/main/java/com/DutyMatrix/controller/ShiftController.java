package com.DutyMatrix.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import com.DutyMatrix.dto.JwtUserDTO;
import com.DutyMatrix.dto.ShiftRequestDTO;
import com.DutyMatrix.dto.ShiftSummaryDTO;
import com.DutyMatrix.services.ShiftService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/shifts")
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class ShiftController {

    private final ShiftService shiftService;

    // Only STATION_INCHARGE can create shifts
    @PostMapping
    @PreAuthorize("hasRole('STATION_INCHARGE')")
    public ResponseEntity<String> createShift(
            @RequestBody ShiftRequestDTO dto,
            @AuthenticationPrincipal JwtUserDTO user) {

        String response = shiftService.createShift(dto, user.getUserId());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/my")
    public ResponseEntity<List<ShiftSummaryDTO>> getMyShifts(
            @AuthenticationPrincipal JwtUserDTO user) {
        return ResponseEntity.ok(shiftService.getShiftsByOfficer(user.getUserId()));
    }
}


