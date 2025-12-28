package com.DutyMatrix.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.DutyMatrix.pojo.RequestStatus;
import com.DutyMatrix.pojo.SwapRequest;

public interface SwapRequestRepository extends JpaRepository<SwapRequest, Long> {
	 List<SwapRequest> findByRequestingUserId(Long userId);

	    List<SwapRequest> findByTargetUserId(Long userId);

	    List<SwapRequest> findByStatus(RequestStatus status);
}
