package com.DutyMatrix.dto;

import java.time.LocalDate;
import java.time.LocalTime;

import com.DutyMatrix.pojo.ShiftType;

import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ShiftRequestDTO {

	 // DAY_SHIFT / NIGHT_SHIFT must be provided
    @NotNull(message = "Shift type is required")
    private ShiftType shtype;
    
    // Shift start time is mandatory
    @NotNull(message = "Shift start time is required")
    private LocalTime shStartTime;

    // Shift end time is mandatory
    @NotNull(message = "Shift end time is required")
    private LocalTime shEndTime;

    // Shift date cannot be in the past
    @NotNull(message = "Shift date is required")
    @FutureOrPresent(message = "Shift date cannot be in the past")
    private LocalDate shDate;

    // Station where shift is created
    @NotNull(message = "Station ID is required")
    private Long stationId;

    // Officer assigned to the shift
    @NotNull(message = "Assigned officer ID is required")
    private Long assignedUserId;
}
