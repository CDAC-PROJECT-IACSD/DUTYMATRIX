package com.DutyMatrix.dto;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

//Police Man → APPLY → PENDING
//Station Incharge → APPROVE → APPROVED
//Station Incharge → REJECT → REJECTED

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LeaveRequestDTO {
    private Date lStartDate;
    private Date lEndDate;
    private String lReason;
}

	

