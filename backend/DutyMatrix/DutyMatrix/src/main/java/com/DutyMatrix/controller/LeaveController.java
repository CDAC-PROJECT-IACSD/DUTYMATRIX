package com.DutyMatrix.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.DutyMatrix.dto.JwtUserDTO;
import com.DutyMatrix.dto.LeaveRequestDTO;
import com.DutyMatrix.dto.LeaveResponseDTO;
import com.DutyMatrix.pojo.LeaveRequest;
import com.DutyMatrix.services.LeaveService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/leave")
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class LeaveController {

    private final LeaveService leaveService;

    // APPLY LEAVE (Any authenticated user)
    @PreAuthorize("isAuthenticated()")
    @PostMapping("/apply")
    public ResponseEntity<String> applyLeave(
            @RequestBody LeaveRequestDTO dto,
            @AuthenticationPrincipal JwtUserDTO user) {

        return ResponseEntity.ok(
                leaveService.applyLeave(dto, user.getUserId())
        );
    }

    // APPROVE LEAVE
    @PreAuthorize("hasAnyRole('STATION_INCHARGE','COMMISSIONER')")
    @PutMapping("/approve/{leaveId}")
    public ResponseEntity<String> approveLeave(
            @PathVariable Long leaveId,
            @AuthenticationPrincipal JwtUserDTO user) {

        return ResponseEntity.ok(
                leaveService.approveLeave(leaveId, user.getUserId())
        );
    }

    // REJECT LEAVE
    @PreAuthorize("hasAnyRole('STATION_INCHARGE','COMMISSIONER')")
    @PutMapping("/reject/{leaveId}")
    public ResponseEntity<String> rejectLeave(
            @PathVariable Long leaveId,
            @AuthenticationPrincipal JwtUserDTO user) {

        return ResponseEntity.ok(
                leaveService.rejectLeave(leaveId, user.getUserId())
        );
    }
    
    @GetMapping("/pending")
    @PreAuthorize("hasRole('COMMISSIONER')")
    public ResponseEntity<List<LeaveResponseDTO>> getPendingLeaves(
            @AuthenticationPrincipal JwtUserDTO user) {

        return ResponseEntity.ok(
            leaveService.getPendingLeavesForCommissioner(user.getUserId())
        );
    }

    

    @GetMapping("/pending/station")
    @PreAuthorize("hasRole('STATION_INCHARGE')")
    public ResponseEntity<List<LeaveResponseDTO>> getPendingLeavesForStationIncharge(
            @AuthenticationPrincipal JwtUserDTO user) {

        return ResponseEntity.ok(
            leaveService.getPendingPoliceLeaves(user.getUserId())
                .stream()
                .map(l -> new LeaveResponseDTO(
                    l.getLid(),
                    l.getUid().getUname(),
                    l.getUid().getUrole().name(),
                    l.getLStatDate(),
                    l.getLEndDate(),
                    l.getLReason(),
                    l.getLStatus().name()
                ))
                .toList()
        );
    }


}