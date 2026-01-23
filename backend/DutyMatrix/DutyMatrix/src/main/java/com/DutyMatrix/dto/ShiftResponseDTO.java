package com.DutyMatrix.dto;

import java.util.Date;
import com.DutyMatrix.pojo.ShiftType;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ShiftResponseDTO {

	private Long shid;
	private ShiftType shtype;
	private Date shStartTime;
	private Date shEndTime;
	private Date shDate;

	private Long stationId;
	private String stationName;

	private Long assignedUserId;
	private String assignedUserName;
}
