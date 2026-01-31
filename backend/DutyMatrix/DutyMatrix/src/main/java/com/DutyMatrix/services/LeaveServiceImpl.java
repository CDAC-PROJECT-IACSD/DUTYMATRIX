package com.DutyMatrix.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.DutyMatrix.custom_exception.ResourceNotFoundException;
import com.DutyMatrix.dto.LeaveRequestDTO;
import com.DutyMatrix.dto.LeaveResponseDTO;
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
     * APPLY LEAVE
     * - Police Officer → PENDING (approved by Station Incharge)
     * - Station Incharge → PENDING (approved by Commissioner)
     * - Commissioner → AUTO APPROVED
     */
    @Override
    public String applyLeave(LeaveRequestDTO dto, Long userId) {

        User user = userRepository.findByUid(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        LeaveRequest leave = new LeaveRequest();
        leave.setLStatDate(dto.getStartDate());
        leave.setLEndDate(dto.getEndDate());
        leave.setLReason(dto.getReason());
        leave.setUid(user);

        // Commissioner → auto approval
        if (user.getUrole() == UserRole.COMMISSIONER) {
            leave.setLStatus(RequestStatus.APPROVED);
            leave.setLapprovedBy(user);
            leaveRepository.save(leave);
            return "Commissioner leave auto-approved";
        }

        // Police Officer or Station Incharge → pending
        if (user.getUrole() == UserRole.POLICE_OFFICER ||
            user.getUrole() == UserRole.STATION_INCHARGE) {

            leave.setLStatus(RequestStatus.PENDING);
            leaveRepository.save(leave);
            return "Leave request submitted and pending approval";
        }

        throw new RuntimeException("Invalid role for leave request");
    }

    /**
     * APPROVE LEAVE
     * - Station Incharge → approves Police Officer
     * - Commissioner → approves Station Incharge
     */
    @Override
    public String approveLeave(Long leaveId, Long approverId) {

        User approver = userRepository.findByUid(approverId)
                .orElseThrow(() -> new ResourceNotFoundException("Approver not found"));

        LeaveRequest leave = leaveRepository.findById(leaveId)
                .orElseThrow(() -> new ResourceNotFoundException("Leave request not found"));

        User requester = leave.getUid();

        // Police Officer leave → Station Incharge approval
        if (requester.getUrole() == UserRole.POLICE_OFFICER) {

            if (approver.getUrole() != UserRole.STATION_INCHARGE) {
                throw new RuntimeException("Only Station Incharge can approve police leave");
            }

            if (!approver.getStation().getSid()
                    .equals(requester.getStation().getSid())) {
                throw new RuntimeException("Station mismatch");
            }
        }

        // Station Incharge leave → Commissioner approval
        else if (requester.getUrole() == UserRole.STATION_INCHARGE) {

            if (approver.getUrole() != UserRole.COMMISSIONER) {
                throw new RuntimeException("Only Commissioner can approve Station Incharge leave");
            }
        }

        else {
            throw new RuntimeException("Invalid leave approval flow");
        }

        leave.setLStatus(RequestStatus.APPROVED);
        leave.setLapprovedBy(approver);
        leaveRepository.save(leave);

        return "Leave approved successfully";
    }

    /**
     * REJECT LEAVE
     * - Station Incharge → rejects Police Officer
     * - Commissioner → rejects Station Incharge
     */
    @Override
    public String rejectLeave(Long leaveId, Long approverId) {

        User approver = userRepository.findByUid(approverId)
                .orElseThrow(() -> new ResourceNotFoundException("Approver not found"));

        LeaveRequest leave = leaveRepository.findById(leaveId)
                .orElseThrow(() -> new ResourceNotFoundException("Leave request not found"));

        User requester = leave.getUid();

        if (requester.getUrole() == UserRole.POLICE_OFFICER &&
            approver.getUrole() != UserRole.STATION_INCHARGE) {
            throw new RuntimeException("Only Station Incharge can reject police leave");
        }

        if (requester.getUrole() == UserRole.STATION_INCHARGE &&
            approver.getUrole() != UserRole.COMMISSIONER) {
            throw new RuntimeException("Only Commissioner can reject Station Incharge leave");
        }

        leave.setLStatus(RequestStatus.REJECTED);
        leave.setLapprovedBy(approver);
        leaveRepository.save(leave);

        return "Leave rejected successfully";
    }
 
    
    @Override
    public List<LeaveRequest> getPendingPoliceLeaves(Long inchargeId) {

        User incharge = userRepository.findByUid(inchargeId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        if (incharge.getUrole() != UserRole.STATION_INCHARGE) {
            throw new RuntimeException("Access denied");
        }

        return leaveRepository.findPendingLeavesByRoleAndStation(
                RequestStatus.PENDING,
                UserRole.POLICE_OFFICER,
                incharge.getStation().getSid()
        );
    }
    
    public List<LeaveResponseDTO> getPendingLeavesForCommissioner(Long commissionerId) {

        User commissioner = userRepository.findByUid(commissionerId)
            .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        if (commissioner.getUrole() != UserRole.COMMISSIONER) {
            throw new RuntimeException("Unauthorized");
        }

        return leaveRepository.findAllPendingLeaves()
            .stream()
            .map(l -> new LeaveResponseDTO(
                l.getLid(),
                l.getUid().getUname(),
                l.getUid().getUrole().name(),
                l.getLStatDate(),
                l.getLEndDate(),
                l.getLReason(),
                l.getLStatus().name()
            ))
            .toList();
    }



    
}