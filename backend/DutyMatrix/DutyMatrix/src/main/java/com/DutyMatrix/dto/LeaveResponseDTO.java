package com.DutyMatrix.dto;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class LeaveResponseDTO {

    private Long leaveId;
    private String userName;
    private String userRole;
    private LocalDate startDate;
    private LocalDate endDate;
    private String reason;
    private String status;
}
