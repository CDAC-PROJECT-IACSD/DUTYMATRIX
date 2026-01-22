package com.DutyMatrix.services;

import org.springframework.stereotype.Service;

import com.DutyMatrix.pojo.Shift;
import com.DutyMatrix.pojo.User;
import com.DutyMatrix.pojo.UserRole;
import com.DutyMatrix.repositories.ShiftRepository;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
@Transactional
public class ShiftServiceImpl implements ShiftService{

	public final ShiftRepository shiftRepository;
	
	@Override
	public Shift createShift(Shift shift, User loggedInUser) {

	    // Role check
	    if (loggedInUser.getUrole() != UserRole.STATION_INCHARGE) {
	        throw new RuntimeException("Only Station Incharge can create shifts");
	    }

	    // Station ownership check
	    if (!shift.getStation().getSid()
	            .equals(loggedInUser.getStation().getSid())) {
	        throw new RuntimeException("Incharge can create shifts only for own station");
	    }

	    // Save shift
	    return shiftRepository.save(shift);
	}


	

}
