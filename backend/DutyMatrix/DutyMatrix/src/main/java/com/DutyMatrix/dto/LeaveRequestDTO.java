package com.DutyMatrix.dto;

import java.time.LocalDate;

import lombok.Getter;
import lombok.Setter;

//Police Man → APPLY → PENDING
//Station Incharge → APPROVE → APPROVED
//Station Incharge → REJECT → REJECTED

@Getter
@Setter
public class LeaveRequestDTO {

	private LocalDate startDate;
    private LocalDate endDate;

}

	

