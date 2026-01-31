package com.DutyMatrix.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.DutyMatrix.dto.JwtUserDTO;
import com.DutyMatrix.dto.LeaveRequestDTO;
import com.DutyMatrix.pojo.User;
import com.DutyMatrix.repositories.UserRepository;
import com.DutyMatrix.services.LeaveService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/leave")
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")

public class LeaveController {

    private final LeaveService leaveService;
    private final UserRepository userRepository;

    // 1️ Police applies leave
    @PreAuthorize("hasRole('POLICE_OFFICER')")
    @PostMapping("/apply")
    public ResponseEntity<String> applyLeave(
            @RequestBody LeaveRequestDTO dto,
            @AuthenticationPrincipal JwtUserDTO user) {

        return ResponseEntity.ok(
                leaveService.applyLeave(dto, user.getUserId())
        );
    }


    // 2️ Station Incharge approves
    @PreAuthorize("hasRole('STATION_INCHARGE')")
    @PutMapping("/approve/{leaveId}")
    public ResponseEntity<String> approveLeave(
            @PathVariable Long leaveId,
            @AuthenticationPrincipal JwtUserDTO user) {

        return ResponseEntity.ok(
                leaveService.approveLeave(leaveId, user.getUserId())
        );
    }



    // 3️ Station Incharge rejects
    @PreAuthorize("hasRole('STATION_INCHARGE')")
    @PutMapping("/reject/{leaveId}")
    public ResponseEntity<String> rejectLeave(
            @PathVariable Long leaveId,
            @AuthenticationPrincipal JwtUserDTO user) {

        return ResponseEntity.ok(
                leaveService.rejectLeave(leaveId, user.getUserId())
        );
    }

}
