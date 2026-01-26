package com.DutyMatrix.services;

import org.springframework.stereotype.Service;

import com.DutyMatrix.dto.LeaveRequestDTO;
import com.DutyMatrix.pojo.LeaveRequest;
import com.DutyMatrix.pojo.RequestStatus;
import com.DutyMatrix.pojo.User;
import com.DutyMatrix.pojo.UserRole;
import com.DutyMatrix.repositories.LeaveRepository;
import com.DutyMatrix.repositories.UserRepository;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class LeaveServiceImpl implements LeaveService {

    private final LeaveRepository leaveRepository;
    private final UserRepository userRepository;

    /**
     * Allows a police officer to apply for leave.
     * Only users with POLICE_OFFICER role are permitted.
     */
    @Override
    public String applyLeave(LeaveRequestDTO dto, Long userId) {

        // Fetch logged-in user from database
        User loggedInUser = userRepository.findByUid(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Role validation
        if (loggedInUser.getUrole() != UserRole.POLICE_OFFICER) {
            throw new RuntimeException("Only police can apply leave");
        }

        // Create leave request
        LeaveRequest leave = new LeaveRequest();
        leave.setLStatDate(dto.getLStartDate());
        leave.setLEndDate(dto.getLEndDate());
        leave.setLReason(dto.getLReason());
        leave.setLStatus(RequestStatus.PENDING);
        leave.setUid(loggedInUser);

        // Persist leave request
        leaveRepository.save(leave);

        return "Leave request submitted (PENDING)";
    }

    /**
     * Allows a station incharge to approve a leave request
     * belonging to their own station.
     */
    @Override
    public String approveLeave(Long leaveId, Long userId) {

        // Fetch logged-in incharge
        User incharge = userRepository.findByUid(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Role validation
        if (incharge.getUrole() != UserRole.STATION_INCHARGE) {
            throw new RuntimeException("Only station incharge can approve leave");
        }

        // Fetch leave request
        LeaveRequest leave = leaveRepository.findById(leaveId)
                .orElseThrow(() -> new RuntimeException("Leave not found"));

        // Station ownership validation
        if (!leave.getUid().getStation().getSid()
                .equals(incharge.getStation().getSid())) {
            throw new RuntimeException("Cannot approve leave of another station");
        }

        // Update leave status
        leave.setLStatus(RequestStatus.APPROVED);
        leave.setLapprovedBy(incharge);

        // Persist changes
        leaveRepository.save(leave);

        return "Leave approved";
    }

    /**
     * Allows a station incharge to reject a leave request
     * belonging to their own station.
     */
    @Override
    public String rejectLeave(Long leaveId, Long userId) {

        // Fetch logged-in incharge
        User incharge = userRepository.findByUid(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Role validation
        if (incharge.getUrole() != UserRole.STATION_INCHARGE) {
            throw new RuntimeException("Only station incharge can reject leave");
        }

        // Fetch leave request
        LeaveRequest leave = leaveRepository.findById(leaveId)
                .orElseThrow(() -> new RuntimeException("Leave not found"));

        // Station ownership validation
        if (!leave.getUid().getStation().getSid()
                .equals(incharge.getStation().getSid())) {
            throw new RuntimeException("Cannot reject leave of another station");
        }

        // Update leave status
        leave.setLStatus(RequestStatus.REJECTED);
        leave.setLapprovedBy(incharge);

        // Persist changes
        leaveRepository.save(leave);

        return "Leave rejected";
    }
}
