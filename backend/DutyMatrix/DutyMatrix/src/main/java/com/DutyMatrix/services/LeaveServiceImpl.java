package com.DutyMatrix.services;

import javax.management.RuntimeErrorException;

import org.springframework.stereotype.Service;

import com.DutyMatrix.custom_exception.ResourceNotFoundException;
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
//        if (loggedInUser.getUrole() != UserRole.POLICE_OFFICER) {
//            throw new RuntimeException("Only police can apply leave");
//        }
        

        // Create leave request
        LeaveRequest leave = new LeaveRequest();
        leave.setLStatDate(dto.getLStartDate());
        leave.setLEndDate(dto.getLEndDate());
        leave.setLReason(dto.getLReason());
        leave.setLStatus(RequestStatus.PENDING);
        leave.setUid(loggedInUser);

        if(loggedInUser.getUrole() == UserRole.COMMISSIONER) {
        	leave.setLStatus(RequestStatus.APPROVED);
        	leave.setLapprovedBy(loggedInUser);
        	leaveRepository.save(leave);
        	return "Commissioner leave auto-approved";
        }
        
        if(loggedInUser.getUrole() == UserRole.POLICE_OFFICER || loggedInUser.getUrole() == UserRole.STATION_INCHARGE) {
        	leave.setLStatus(RequestStatus.PENDING);
        	leaveRepository.save(leave);
        	
        	return "leave request submitted";
        }
        
        
//        // Persist leave request
//        leaveRepository.save(leave);
//
//        return "Leave request submitted (PENDING)";
        throw new RuntimeException("Invalid role for leave request");
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

        // Role validation not required
//        if (incharge.getUrole() != UserRole.STATION_INCHARGE) {
//            throw new RuntimeException("Only station incharge can approve leave");
//        }

        // Fetch leave request
        LeaveRequest leave = leaveRepository.findById(leaveId)
                .orElseThrow(() -> new RuntimeException("Leave not found"));

        User requester = leave.getUid();
        
        // Station ownership validation
//        if (!leave.getUid().getStation().getSid()
//                .equals(incharge.getStation().getSid())) {
//            throw new RuntimeException("Cannot approve leave of another station");
//        }
        
        if(requester.getUrole() == UserRole.POLICE_OFFICER) {
        	if(incharge.getUrole() != UserRole.STATION_INCHARGE) {
        		throw new ResourceNotFoundException("Only Station-Incharge can approve this leave request");
        	}
        	
        	if(!incharge.getStation().getSid().equals(requester.getStation().getSid())) {
        		throw new RuntimeException("Different station's station-incharge cannot approve this leave request");
        	}
        }
        
        else if(requester.getUrole() == UserRole.STATION_INCHARGE) {
        	if(incharge.getUrole() != UserRole.COMMISSIONER) {
        		throw new RuntimeException("Only commissioner can approve your request");
        	}
        }
        
        else {
        	throw new RuntimeException("Invalid leave approve");
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
//        if (incharge.getUrole() != UserRole.STATION_INCHARGE) {
//            throw new RuntimeException("Only station incharge can reject leave");
//        }

        // Fetch leave request
        LeaveRequest leave = leaveRepository.findById(leaveId)
                .orElseThrow(() -> new RuntimeException("Leave not found"));

        User requester = leave.getUid();

        if (requester.getUrole() == UserRole.POLICE_OFFICER &&
            incharge.getUrole() != UserRole.STATION_INCHARGE) {
            throw new RuntimeException("Only Station Incharge can reject police leave");
        }

        if (requester.getUrole() == UserRole.STATION_INCHARGE &&
            incharge.getUrole() != UserRole.COMMISSIONER) {
            throw new RuntimeException("Only Commissioner can reject incharge leave");
        }

        // Update leave status
        leave.setLStatus(RequestStatus.REJECTED);
        leave.setLapprovedBy(incharge);

        // Persist changes
        leaveRepository.save(leave);

        return "Leave rejected";
    }
}
