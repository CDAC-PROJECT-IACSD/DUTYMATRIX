package com.DutyMatrix.services;

import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;

import com.DutyMatrix.dto.ShiftRequestDTO;
import com.DutyMatrix.dto.ShiftSummaryDTO;
import com.DutyMatrix.notification.NotificationClient;
import com.DutyMatrix.pojo.Shift;
import com.DutyMatrix.pojo.User;
import com.DutyMatrix.pojo.UserRole;
import com.DutyMatrix.repositories.ShiftRepository;
import com.DutyMatrix.repositories.UserRepository;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class ShiftServiceImpl implements ShiftService {

	private final ShiftRepository shiftRepository;
	private final UserRepository userRepository;

	// 🔔 Notification client (NEW)
	private final NotificationClient notificationClient;

	@Override
	public String createShift(ShiftRequestDTO dto, Long loggedInUserId) {

		User incharge = userRepository.findById(loggedInUserId)
				.orElseThrow(() -> new RuntimeException("User not found"));

		if (incharge.getUrole() != UserRole.STATION_INCHARGE) {
			throw new RuntimeException("Only Station Incharge can create shifts");
		}

		if (!incharge.getStation().getSid().equals(dto.getStationId())) {
			throw new RuntimeException("Cannot create shift for another station");
		}

		Shift shift = new Shift();
		shift.setShtype(dto.getShtype());
		shift.setShDate(dto.getShDate());
		shift.setShStartTime(dto.getShStartTime());
		shift.setShEndTime(dto.getShEndTime());
		shift.setStation(incharge.getStation());

		User assignedOfficer = null;

		if (dto.getAssignedUserId() != null) {
			assignedOfficer = userRepository.findById(dto.getAssignedUserId())
					.orElseThrow(() -> new RuntimeException("Officer not found"));
			shift.setAssignedUser(assignedOfficer);
		}

		shiftRepository.save(shift);

		// 🔔 SEND NOTIFICATION TO OFFICER (NEW)
		if (assignedOfficer != null) {
			notificationClient.send(
				assignedOfficer.getUid(),
				"You have been assigned a " + shift.getShtype().name() +
				" on " + shift.getShDate() +
				" from " + shift.getShStartTime() +
				" to " + shift.getShEndTime()
			);
		}

		return "New shift assigned successfully";
	}

	@Override
	public List<ShiftSummaryDTO> getShiftsForStation(Long stationId) {

		return shiftRepository.findByStation_Sid(stationId).stream()
				.map(shift -> new ShiftSummaryDTO(
						shift.getShid(),
						shift.getAssignedUser() != null
								? shift.getAssignedUser().getUname()
								: "Unassigned",
						shift.getShtype().name(),
						shift.getShDate(),
						shift.getShStartTime(),
						shift.getShEndTime()
				))
				.toList();
	}

	@Override
	public List<ShiftSummaryDTO> getShiftsForStationAndDate(
	        Long stationId,
	        LocalDate date
	) {
	    return shiftRepository
	            .findByStation_SidAndShDate(stationId, date)
	            .stream()
	            .map(shift -> new ShiftSummaryDTO(
	                    shift.getShid(),
	                    shift.getAssignedUser() != null
	                            ? shift.getAssignedUser().getUname()
	                            : "Unassigned",
	                    shift.getShtype().name(),
	                    shift.getShDate(),
	                    shift.getShStartTime(),
	                    shift.getShEndTime()
	            ))
	            .toList();
	}

	@Override
	public List<ShiftSummaryDTO> getShiftsByOfficer(Long userId) {
		return shiftRepository.findByAssignedUser_Uid(userId).stream()
				.map(shift -> new ShiftSummaryDTO(
						shift.getShid(),
						shift.getAssignedUser() != null
								? shift.getAssignedUser().getUname()
								: "Unassigned",
						shift.getShtype().name(),
						shift.getShDate(),
						shift.getShStartTime(),
						shift.getShEndTime()
				))
				.toList();
	}
}
