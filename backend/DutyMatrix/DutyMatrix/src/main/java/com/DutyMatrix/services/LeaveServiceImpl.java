package com.DutyMatrix.services;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.DutyMatrix.dto.LeaveRequestDTO;
import com.DutyMatrix.dto.LeaveResponseDTO;
import com.DutyMatrix.custom_exception.ResourceNotFoundException;
import com.DutyMatrix.pojo.LeaveRequest;
import com.DutyMatrix.pojo.RequestStatus;
import com.DutyMatrix.pojo.User;
import com.DutyMatrix.pojo.UserRole;
import com.DutyMatrix.repositories.LeaveRepository;
import com.DutyMatrix.repositories.UserRepository;

import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class LeaveServiceImpl implements LeaveService {

    private final LeaveRepository leaveRepository;
    private final UserRepository userRepository;

    /**
     * APPLY LEAVE
     */
    @Override
    public String applyLeave(LeaveRequestDTO dto, Long userId) {

        User user = userRepository.findByUid(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        LeaveRequest leave = new LeaveRequest();
        leave.setLStartDate(dto.getLStartDate());
        leave.setLEndDate(dto.getLEndDate());
        leave.setLReason(dto.getLReason());
        leave.setUid(user);

        // Commissioner → auto approve
        if (user.getUrole() == UserRole.COMMISSIONER) {
            leave.setLStatus(RequestStatus.APPROVED);
            leave.setLapprovedBy(user);
            leaveRepository.save(leave);
            return "Commissioner leave auto-approved";
        }

        // Officer or Incharge → pending
        leave.setLStatus(RequestStatus.PENDING);
        leaveRepository.save(leave);
        return "Leave request submitted";
    }

    /**
     * APPROVE LEAVE
     */
    @Override
    public String approveLeave(Long leaveId, Long approverId) {

        User approver = userRepository.findByUid(approverId)
                .orElseThrow(() -> new ResourceNotFoundException("Approver not found"));

        LeaveRequest leave = leaveRepository.findById(leaveId)
                .orElseThrow(() -> new ResourceNotFoundException("Leave request not found"));

        User requester = leave.getUid();

        // Police Officer → Station Incharge
        if (requester.getUrole() == UserRole.POLICE_OFFICER) {

            if (approver.getUrole() != UserRole.STATION_INCHARGE) {
                throw new RuntimeException("Only Station Incharge can approve police leave");
            }

            if (!approver.getStation().getSid()
                    .equals(requester.getStation().getSid())) {
                throw new RuntimeException("Station mismatch");
            }
        }

        // Station Incharge → Commissioner
        else if (requester.getUrole() == UserRole.STATION_INCHARGE) {

            if (approver.getUrole() != UserRole.COMMISSIONER) {
                throw new RuntimeException("Only Commissioner can approve incharge leave");
            }
        } else {
            throw new RuntimeException("Invalid leave approval flow");
        }

        leave.setLStatus(RequestStatus.APPROVED);
        leave.setLapprovedBy(approver);
        leaveRepository.save(leave);

        return "Leave approved successfully";
    }

    /**
     * REJECT LEAVE
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
            throw new RuntimeException("Only Commissioner can reject incharge leave");
        }

        leave.setLStatus(RequestStatus.REJECTED);
        leave.setLapprovedBy(approver);
        leaveRepository.save(leave);

        return "Leave rejected successfully";
    }

    /**
     * Pending Police Leaves for Station Incharge
     */
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

    /**
     * Pending Leaves for Commissioner
     */
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
                        l.getLStartDate(),
                        l.getLEndDate(),
                        l.getLReason(),
                        l.getLStatus().name()
                ))
                .toList();
    }
}
