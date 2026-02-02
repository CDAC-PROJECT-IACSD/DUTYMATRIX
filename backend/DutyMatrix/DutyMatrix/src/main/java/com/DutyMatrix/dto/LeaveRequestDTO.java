package com.DutyMatrix.dto;

import java.time.LocalDate;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LeaveRequestDTO {

    private LocalDate lStartDate;
    private LocalDate lEndDate;
    private String lReason;

}
