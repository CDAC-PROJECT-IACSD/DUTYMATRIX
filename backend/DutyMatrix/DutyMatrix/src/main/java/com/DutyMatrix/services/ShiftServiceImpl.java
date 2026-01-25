package com.DutyMatrix.services;

import org.springframework.stereotype.Service;

import com.DutyMatrix.dto.ShiftRequestDTO;
import com.DutyMatrix.pojo.Shift;
import com.DutyMatrix.pojo.User;
import com.DutyMatrix.pojo.UserRole;
import com.DutyMatrix.repositories.ShiftRepository;
import com.DutyMatrix.repositories.StationRepository;
import com.DutyMatrix.repositories.UserRepository;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;


	@Service
	@Transactional
	@AllArgsConstructor
	public class ShiftServiceImpl implements ShiftService {

	    private final ShiftRepository shiftRepository;
	    private final StationRepository stationRepository;
	    private final UserRepository userRepository;

	   


		@Override
		public String createShift(ShiftRequestDTO dto, Long loggedInUserId) {
			
			
			 User incharge = userRepository.findById(loggedInUserId)
		                .orElseThrow(() -> new RuntimeException("User not found"));

		        if (incharge.getUrole() != UserRole.STATION_INCHARGE) {
		            throw new RuntimeException("Only Station Incharge can create shifts");
		        }

		        // Ensure shift is created ONLY for incharge's station
		        if (!incharge.getStation().getSid().equals(dto.getStationId())) {
		            throw new RuntimeException("Cannot create shift for another station");
		        }

		        Shift shift = new Shift();
		        shift.setShtype(dto.getShtype());
		        shift.setShStartTime(dto.getShStartTime());
		        shift.setShEndTime(dto.getShEndTime());
		        shift.setShDate(dto.getShDate());
		        shift.setStation(incharge.getStation());

		        if (dto.getAssignedUserId() != null) {
		            User officer = userRepository.findById(dto.getAssignedUserId())
		                    .orElseThrow(() -> new RuntimeException("Officer not found"));
		            shift.setAssignedUser(officer);
		        }

		        shiftRepository.save(shift);

		        return "new shift assigned successfully";
		}
	}
