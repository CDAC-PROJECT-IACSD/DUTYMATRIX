package com.DutyMatrix.dto;

import java.util.Date;

import com.DutyMatrix.pojo.ShiftType;
import com.DutyMatrix.pojo.Station;
import com.DutyMatrix.pojo.User;

public class ShiftRequestDTO {

	private ShiftType shtype;

	private Date shStartTime;
	private Date shEndTime;
	private Date shDate;

	private Station station;

	private User assignedUser;
}
