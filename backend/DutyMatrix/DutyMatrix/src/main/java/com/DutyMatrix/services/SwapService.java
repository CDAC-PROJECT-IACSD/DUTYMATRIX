package com.DutyMatrix.services;

import java.awt.List;

import com.DutyMatrix.dto.SwapRequestDTO;
import com.DutyMatrix.pojo.SwapRequest;
import com.DutyMatrix.repositories.SwapRequestRepository;

public interface SwapService {
	SwapRequest createSwapRequest(SwapRequestDTO dto);

    SwapRequest approveSwap(Long swapId, Long approverId);

    SwapRequest rejectSwap(Long swapId, Long approverId);

    List<SwapRequest> getPendingRequestsByStation(Long stationId);
}
