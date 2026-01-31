package com.DutyMatrix.services;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.DutyMatrix.dto.LeaveRequestDTO;
import com.DutyMatrix.pojo.RequestStatus;
import com.DutyMatrix.pojo.User;
import com.DutyMatrix.pojo.UserRole;
import com.DutyMatrix.repositories.LeaveRepository;
import com.DutyMatrix.repositories.UserRepository;
import com.DutyMatrix.pojo.LeaveRequest;


import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class LeaveServiceImpl implements LeaveService {

    private final LeaveRepository leaveRepository;
    private final UserRepository userRepository;

    @Override
    public String applyLeave(LeaveRequestDTO dto, Long userId) {

        User loggedInUser = userRepository.findByUid(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        LeaveRequest leave = new LeaveRequest();

        // ✅ CORRECT FIELD MAPPING (IMPORTANT)
        leave.setLStartDate(dto.getLStartDate());
        leave.setLEndDate(dto.getLEndDate());
        leave.setLReason(dto.getLReason());

        leave.setUid(loggedInUser);
        leave.setLStatus(RequestStatus.PENDING);

        // Commissioner → auto approve
        if (loggedInUser.getUrole() == UserRole.COMMISSIONER) {
            leave.setLStatus(RequestStatus.APPROVED);
            leave.setLapprovedBy(loggedInUser);
            leaveRepository.save(leave);
            return "Commissioner leave auto-approved";
        }

        // Police Officer OR Station Incharge → pending
        if (loggedInUser.getUrole() == UserRole.POLICE_OFFICER
                || loggedInUser.getUrole() == UserRole.STATION_INCHARGE) {

            leaveRepository.save(leave);
            return "Leave request submitted";
        }

        throw new RuntimeException("Invalid role for leave request");
    }

    @Override
    public String approveLeave(Long leaveId, Long userId) {

        User approver = userRepository.findByUid(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        LeaveRequest leave = leaveRepository.findById(leaveId)
                .orElseThrow(() -> new RuntimeException("Leave not found"));

        User requester = leave.getUid();

        // Police → approved by Station Incharge (same station)
        if (requester.getUrole() == UserRole.POLICE_OFFICER) {

            if (approver.getUrole() != UserRole.STATION_INCHARGE) {
                throw new RuntimeException("Only Station Incharge can approve police leave");
            }

            if (!approver.getStation().getSid()
                    .equals(requester.getStation().getSid())) {
                throw new RuntimeException("Different station incharge cannot approve");
            }
        }

        // Station Incharge → approved by Commissioner
        else if (requester.getUrole() == UserRole.STATION_INCHARGE) {

            if (approver.getUrole() != UserRole.COMMISSIONER) {
                throw new RuntimeException("Only Commissioner can approve incharge leave");
            }
        }

        else {
            throw new RuntimeException("Invalid leave approval request");
        }

        leave.setLStatus(RequestStatus.APPROVED);
        leave.setLapprovedBy(approver);

        leaveRepository.save(leave);
        return "Leave approved";
    }

    @Override
    public String rejectLeave(Long leaveId, Long userId) {

        User approver = userRepository.findByUid(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        LeaveRequest leave = leaveRepository.findById(leaveId)
                .orElseThrow(() -> new RuntimeException("Leave not found"));

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
        return "Leave rejected";
    }
}
