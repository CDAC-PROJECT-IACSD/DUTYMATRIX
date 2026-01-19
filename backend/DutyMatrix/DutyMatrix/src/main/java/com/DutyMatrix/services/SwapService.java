package com.DutyMatrix.services;

import java.util.List;

import com.DutyMatrix.dto.SwapRequestDTO;
import com.DutyMatrix.pojo.SwapRequest;

public interface SwapService {
	SwapRequest createSwapRequest(SwapRequestDTO dto);

    SwapRequest approveSwap(Long swapId, Long approverId);

    SwapRequest rejectSwap(Long swapId, Long approverId);

    List<SwapRequest> getPendingRequestsByStation(Long stationId);
}
