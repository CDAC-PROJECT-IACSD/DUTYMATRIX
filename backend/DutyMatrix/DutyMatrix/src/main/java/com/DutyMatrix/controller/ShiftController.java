package com.DutyMatrix.controller;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.DutyMatrix.dto.ShiftRequestDTO;
import com.DutyMatrix.dto.ShiftResponseDTO;
import com.DutyMatrix.pojo.Station;
import com.DutyMatrix.pojo.User;
import com.DutyMatrix.pojo.UserRole;
import com.DutyMatrix.services.ShiftService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/shifts")
@AllArgsConstructor
public class ShiftController {

    private final ShiftService shiftService;

    @PostMapping("/create")
    public ResponseEntity<ShiftResponseDTO> createShift(
            @RequestBody ShiftRequestDTO dto) {

        // TEMP login simulation
        User loggedInUser = new User();
        loggedInUser.setUrole(UserRole.STATION_INCHARGE);
        loggedInUser.setStation(new Station());
        loggedInUser.getStation().setSid(dto.getStationId());

        return ResponseEntity.ok(
                shiftService.createShift(dto, loggedInUser)
        );
    }
}
