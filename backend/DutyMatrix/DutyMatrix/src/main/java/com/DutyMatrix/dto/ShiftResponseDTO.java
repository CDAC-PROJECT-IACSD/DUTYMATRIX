package com.DutyMatrix.dto;

import java.time.LocalDate;
import java.time.LocalTime;

import com.DutyMatrix.pojo.ShiftType;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ShiftResponseDTO {

	private Long shid;
	private ShiftType shtype;
	private LocalTime shStartTime;
	private LocalTime shEndTime;
	private LocalDate shDate;

	private Long stationId;
	private String stationName;

	private Long assignedUserId;
	private String assignedUserName;
}
