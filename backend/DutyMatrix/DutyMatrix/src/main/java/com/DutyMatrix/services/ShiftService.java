package com.DutyMatrix.services;

import com.DutyMatrix.pojo.Shift;
import com.DutyMatrix.pojo.User;

public interface ShiftService
{
	// shift created by station-incharge for policeOfficers.
	Shift createShift(Shift shift, User loggedInUser);
}
