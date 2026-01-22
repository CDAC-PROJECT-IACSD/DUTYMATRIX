package com.DutyMatrix.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.DutyMatrix.pojo.Shift;
import com.DutyMatrix.pojo.User;
import com.DutyMatrix.pojo.UserRole;
import com.DutyMatrix.services.ShiftService;

@RestController
@RequestMapping("/shifts")
public class ShiftController {

    private final ShiftService shiftService;

    // Constructor ONLY for dependency injection
    public ShiftController(ShiftService shiftService) {
        this.shiftService = shiftService;
    }

    // API method MUST be outside constructor
    @PostMapping("/create")
    public ResponseEntity<Shift> createShift(@RequestBody Shift shift) {

        // TEMPORARY: simulate logged-in user
        User loggedInUser = new User();
        loggedInUser.setUrole(UserRole.STATION_INCHARGE);
        loggedInUser.setStation(shift.getStation());

        Shift savedShift = shiftService.createShift(shift, loggedInUser);

        return ResponseEntity.ok(savedShift);
    }
}
