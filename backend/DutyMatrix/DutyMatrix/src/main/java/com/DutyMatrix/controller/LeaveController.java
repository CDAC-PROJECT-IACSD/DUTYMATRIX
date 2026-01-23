package com.DutyMatrix.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.DutyMatrix.dto.LeaveRequestDTO;
import com.DutyMatrix.pojo.User;
import com.DutyMatrix.repositories.UserRepository;
import com.DutyMatrix.services.LeaveService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/leave")
@AllArgsConstructor
public class LeaveController {

    private final LeaveService leaveService;
    private final UserRepository userRepository;

    // 1️⃣ Police applies leave
    @PostMapping("/apply")
    public ResponseEntity<String> applyLeave(@RequestBody LeaveRequestDTO dto) {

        // POLICE_OFFICER → user_id = 2
        User loggedInUser = userRepository.findById(2L).orElseThrow();

        return ResponseEntity.ok(
                leaveService.applyLeave(dto, loggedInUser)
        );
    }

    // 2️⃣ Station Incharge approves
    @PutMapping("/approve/{leaveId}")
    public ResponseEntity<String> approveLeave(@PathVariable Long leaveId) {

        // STATION_INCHARGE → user_id = 3
        User loggedInUser = userRepository.findById(3L).orElseThrow();

        return ResponseEntity.ok(
                leaveService.approveLeave(leaveId, loggedInUser)
        );
    }

    // 3️⃣ Station Incharge rejects
    @PutMapping("/reject/{leaveId}")
    public ResponseEntity<String> rejectLeave(@PathVariable Long leaveId) {

        // STATION_INCHARGE → user_id = 3
        User loggedInUser = userRepository.findById(3L).orElseThrow();

        return ResponseEntity.ok(
                leaveService.rejectLeave(leaveId, loggedInUser)
        );
    }
}
