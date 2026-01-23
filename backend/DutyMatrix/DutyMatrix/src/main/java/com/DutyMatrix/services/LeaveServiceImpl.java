package com.DutyMatrix.services;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.DutyMatrix.dto.LeaveRequestDTO;
import com.DutyMatrix.pojo.LeaveRequest;
import com.DutyMatrix.pojo.RequestStatus;
import com.DutyMatrix.pojo.User;
import com.DutyMatrix.pojo.UserRole;
import com.DutyMatrix.repositories.LeaveRepository;

import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class LeaveServiceImpl implements LeaveService {

    private final LeaveRepository leaveRepository;

    // 1️⃣ Police applies leave
    @Override
    public String applyLeave(LeaveRequestDTO dto, User loggedInUser) {

        if (loggedInUser.getUrole() != UserRole.POLICE_OFFICER) {
            throw new RuntimeException("Only police can apply leave");
        }

        LeaveRequest leave = new LeaveRequest();
        leave.setLStatDate(dto.getLStartDate());
        leave.setLEndDate(dto.getLEndDate());
        leave.setLReason(dto.getLReason());
        leave.setLStatus(RequestStatus.PENDING);
        leave.setUid(loggedInUser);

        leaveRepository.save(leave);

        return "Leave request submitted (PENDING)";
    }

    // 2️⃣ Incharge approves leave
    @Override
    public String approveLeave(Long leaveId, User loggedInUser) {

        if (loggedInUser.getUrole() != UserRole.STATION_INCHARGE) {
            throw new RuntimeException("Only station incharge can approve leave");
        }

        LeaveRequest leave = leaveRepository.findById(leaveId)
                .orElseThrow(() -> new RuntimeException("Leave not found"));

        // station check (VERY IMPORTANT)
        if (!leave.getUid().getStation().getSid()
                .equals(loggedInUser.getStation().getSid())) {
            throw new RuntimeException("Cannot approve other station leave");
        }

        leave.setLStatus(RequestStatus.APPROVED);
        leave.setLapprovedBy(loggedInUser);

        return "Leave approved";
    }

    // 3️⃣ Incharge rejects leave
    @Override
    public String rejectLeave(Long leaveId, User loggedInUser) {

        if (loggedInUser.getUrole() != UserRole.STATION_INCHARGE) {
            throw new RuntimeException("Only station incharge can reject leave");
        }

        LeaveRequest leave = leaveRepository.findById(leaveId)
                .orElseThrow(() -> new RuntimeException("Leave not found"));

        leave.setLStatus(RequestStatus.REJECTED);
        leave.setLapprovedBy(loggedInUser);

        return "Leave rejected";
    }
}
