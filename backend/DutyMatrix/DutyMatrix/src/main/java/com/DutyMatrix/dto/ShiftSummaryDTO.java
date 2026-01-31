package com.DutyMatrix.dto;

import java.time.LocalDate;
import java.time.LocalTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class ShiftSummaryDTO {
	private Long shiftId;
	private String officerName;
	private String shiftType;
	private LocalDate shiftDate;
	private LocalTime startTime;
	private LocalTime endTime;
}
