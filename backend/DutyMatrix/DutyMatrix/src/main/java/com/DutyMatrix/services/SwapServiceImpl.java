package com.DutyMatrix.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.DutyMatrix.custom_exception.ResourceNotFoundException;
import com.DutyMatrix.dto.SwapRequestDTO;
import com.DutyMatrix.pojo.SwapRequest;
import com.DutyMatrix.pojo.User;
import com.DutyMatrix.repositories.SwapRequestRepository;
import com.DutyMatrix.repositories.UserRepository;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class SwapServiceImpl implements SwapService {

	public final SwapRequestRepository swapRequestRepo;
	public final UserRepository userRepo;
//	public final ShiftRepository shiftRepo;
	
	@Override
	public SwapRequest createSwapRequest(SwapRequestDTO dto) {
		// TODO Auto-generated method stub
		User requester = userRepo.findById(dto.getRequestingUserId()).orElseThrow(() -> new ResourceNotFoundException("Requesting user id not found"));
		
		User targeter = userRepo.findById(dto.getTargetUserId()).orElseThrow(() -> new ResourceNotFoundException("Targeting user id not found"));
		
//		User approver = userRepo.findById(dto.get)
		return null;
	}

	@Override
	public SwapRequest approveSwap(Long swapId, Long approverId) {
		return null;
		// TODO Auto-generated method stub
	}

	@Override
	public SwapRequest rejectSwap(Long swapId, Long approverId) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<SwapRequest> getPendingRequestsByStation(Long stationId) {
		// TODO Auto-generated method stub
		return null;
	}

}
