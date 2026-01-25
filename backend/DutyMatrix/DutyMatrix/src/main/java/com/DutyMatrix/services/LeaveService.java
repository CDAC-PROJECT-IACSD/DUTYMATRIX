package com.DutyMatrix.services;


import com.DutyMatrix.dto.LeaveRequestDTO;
import com.DutyMatrix.pojo.User;

public interface LeaveService {

    String applyLeave(LeaveRequestDTO dto, Long userId);

    String approveLeave(Long leaveId, Long userId);

    String rejectLeave(Long leaveId, Long userId);
}
