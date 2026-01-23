package com.DutyMatrix.services;

import org.springframework.stereotype.Service;

import com.DutyMatrix.dto.ShiftRequestDTO;
import com.DutyMatrix.dto.ShiftResponseDTO;
import com.DutyMatrix.pojo.Shift;
import com.DutyMatrix.pojo.Station;
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
	    public ShiftResponseDTO createShift(ShiftRequestDTO dto, User loggedInUser) {

	        // 1️⃣ Role check
	        if (loggedInUser.getUrole() != UserRole.STATION_INCHARGE) {
	            throw new RuntimeException("Only Station Incharge can create shift");
	        }

	        // 2️⃣ Fetch station
	        Station station = stationRepository.findById(dto.getStationId())
	                .orElseThrow(() -> new RuntimeException("Station not found"));

	        // 3️⃣ Ownership check
	        if (!station.getSid().equals(loggedInUser.getStation().getSid())) {
	            throw new RuntimeException("Cannot create shift for other station");
	        }

	        // 4️⃣ Fetch assigned user
	        User assignedUser = userRepository.findById(dto.getAssignedUserId())
	                .orElseThrow(() -> new RuntimeException("User not found"));

	        // 5️⃣ Create Shift
	        Shift shift = new Shift();
	        shift.setShtype(dto.getShtype());
	        shift.setShStartTime(dto.getShStartTime());
	        shift.setShEndTime(dto.getShEndTime());
	        shift.setShDate(dto.getShDate());
	        shift.setStation(station);
	        shift.setAssignedUser(assignedUser);

	        Shift saved = shiftRepository.save(shift);

	        // 6️⃣ Entity → Response DTO
	        ShiftResponseDTO response = new ShiftResponseDTO();
	        response.setShid(saved.getShid());
	        response.setShtype(saved.getShtype());
	        response.setShStartTime(saved.getShStartTime());
	        response.setShEndTime(saved.getShEndTime());
	        response.setShDate(saved.getShDate());
	        response.setStationId(station.getSid());
	        response.setStationName(station.getSname());
	        response.setAssignedUserId(assignedUser.getUid());
	        response.setAssignedUserName(assignedUser.getUname());

	        return response;
	    }
	}
