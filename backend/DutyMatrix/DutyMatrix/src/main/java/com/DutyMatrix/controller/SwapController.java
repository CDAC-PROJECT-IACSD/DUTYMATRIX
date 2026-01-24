package com.DutyMatrix.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.DutyMatrix.dto.SwapRequestDTO;
import com.DutyMatrix.dto.SwapResponseDTO;
import com.DutyMatrix.pojo.SwapRequest;
import com.DutyMatrix.services.SwapService;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/swaps")
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class SwapController {

	private final SwapService swapService;
	
	@PostMapping
	public ResponseEntity<?> createSwap(@Valid @RequestBody SwapRequestDTO dto) {

	    SwapRequest swap = swapService.createSwapRequest(dto);

	    SwapResponseDTO response = new SwapResponseDTO();
	    response.setSwapId(swap.getSwapId());
	    response.setStatus(swap.getStatus().name());
	    response.setRequestingUser(swap.getRequestingUser().getUname());
	    response.setTargetUser(swap.getTargetUser().getUname());
	    response.setShiftType(swap.getShift().getShtype().name());

	    return ResponseEntity.status(HttpStatus.CREATED).body(response);
	}

	
	@PutMapping("/{swapId}/approve")
	public ResponseEntity<?> approveSwap(
	        @PathVariable Long swapId,
	        @RequestParam Long approverId) {

	    SwapRequest swap = swapService.approveSwap(swapId, approverId);

	    SwapResponseDTO response = new SwapResponseDTO();
	    response.setSwapId(swap.getSwapId());
	    response.setStatus(swap.getStatus().name());
	    response.setRequestingUser(swap.getRequestingUser().getUname());
	    response.setTargetUser(swap.getTargetUser().getUname());
	    response.setShiftType(swap.getShift().getShtype().name());
	    response.setApprovedBy(swap.getApprovedBy().getUname());

	    return ResponseEntity.ok(response);
	}

	
	@PutMapping("/{swapId}/reject")
	public ResponseEntity<?> rejectSwap(
	        @PathVariable Long swapId,
	        @RequestParam Long approverId) {

	    SwapRequest swap = swapService.rejectSwap(swapId, approverId);

	    SwapResponseDTO response = new SwapResponseDTO();
	    response.setSwapId(swap.getSwapId());
	    response.setStatus(swap.getStatus().name());
	    response.setRequestingUser(swap.getRequestingUser().getUname());
	    response.setTargetUser(swap.getTargetUser().getUname());
	    response.setShiftType(swap.getShift().getShtype().name());
	    response.setApprovedBy(swap.getApprovedBy().getUname());

	    return ResponseEntity.ok(response);
	}

	@GetMapping("/pending/{stationId}")
	public ResponseEntity<?> getPendingSwaps(@PathVariable Long stationId) {

	    List<SwapResponseDTO> response =
	            swapService.getPendingRequestsByStation(stationId)
	                    .stream()
	                    .map(swap -> {
	                        SwapResponseDTO dto = new SwapResponseDTO();
	                        dto.setSwapId(swap.getSwapId());
	                        dto.setStatus(swap.getStatus().name());
	                        dto.setRequestingUser(swap.getRequestingUser().getUname());
	                        dto.setTargetUser(swap.getTargetUser().getUname());
	                        dto.setShiftType(swap.getShift().getShtype().name());
	                        return dto;
	                    })
	                    .toList();

	    return ResponseEntity.ok(response);
	}

}
