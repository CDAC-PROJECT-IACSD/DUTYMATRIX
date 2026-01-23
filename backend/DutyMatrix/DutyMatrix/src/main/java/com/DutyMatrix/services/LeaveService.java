package com.DutyMatrix.services;


import com.DutyMatrix.dto.LeaveRequestDTO;
import com.DutyMatrix.pojo.User;

public interface LeaveService {

    String applyLeave(LeaveRequestDTO dto, User loggedInUser);

    String approveLeave(Long leaveId, User loggedInUser);

    String rejectLeave(Long leaveId, User loggedInUser);
}
