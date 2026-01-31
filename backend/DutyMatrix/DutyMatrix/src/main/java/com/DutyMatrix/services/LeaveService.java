package com.DutyMatrix.services;

import java.util.List;

import com.DutyMatrix.dto.LeaveRequestDTO;
import com.DutyMatrix.dto.LeaveResponseDTO;
import com.DutyMatrix.pojo.LeaveRequest;

public interface LeaveService {

	String applyLeave(LeaveRequestDTO dto, Long userId);

	String approveLeave(Long leaveId, Long userId);

	String rejectLeave(Long leaveId, Long userId);

	// Station Incharge dashboard
	List<LeaveRequest> getPendingPoliceLeaves(Long inchargeId);

	// Commissioner dashboard
	List<LeaveResponseDTO> getPendingLeavesForCommissioner(Long commissionerId);

	
	
	

}
