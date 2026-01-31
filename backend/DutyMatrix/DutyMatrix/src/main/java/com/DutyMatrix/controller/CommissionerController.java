package com.DutyMatrix.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.DutyMatrix.dto.JwtUserDTO;
import com.DutyMatrix.dto.ShiftSummaryDTO;
import com.DutyMatrix.dto.StationSummaryDTO;
import com.DutyMatrix.repositories.UserRepository;
import com.DutyMatrix.services.ShiftService;
import com.DutyMatrix.services.StationService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/commissioner")
@AllArgsConstructor
public class CommissionerController {

    private final StationService stationService;
    private final ShiftService shiftService;
    private final UserRepository userRepo;

    // Commissioner can view all stations with users
    @PreAuthorize("hasRole('COMMISSIONER')")
    @GetMapping("/stations")
    public ResponseEntity<List<StationSummaryDTO>> getCommissionerStations(
            Authentication authentication
    ) {
        JwtUserDTO user = (JwtUserDTO) authentication.getPrincipal();

        Long stationId = user.getStationId();

        return ResponseEntity.ok(
                List.of(stationService.getStationSummaryByStationId(stationId))
        );
    }
    
 // 🔹 Duty Oversight (READ-ONLY)
    @PreAuthorize("hasRole('COMMISSIONER')")
    @GetMapping("/duties")
    public ResponseEntity<List<ShiftSummaryDTO>> getDutyRoster(
            @RequestParam("date") LocalDate date,
            Authentication authentication
    ) {
        JwtUserDTO user = (JwtUserDTO) authentication.getPrincipal();

        Long stationId = user.getStationId();

        return ResponseEntity.ok(
                shiftService.getShiftsForStationAndDate(stationId, date)
        );
    }

}
