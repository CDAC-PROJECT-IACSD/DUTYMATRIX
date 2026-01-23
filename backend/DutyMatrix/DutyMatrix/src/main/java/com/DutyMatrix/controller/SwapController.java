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
import com.DutyMatrix.pojo.SwapRequest;
import com.DutyMatrix.services.SwapService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/swaps")
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class SwapController {

	private final SwapService swapService;
	
	@PostMapping
	public ResponseEntity<?> createSwap(@RequestBody SwapRequestDTO dto){
		SwapRequest req = swapService.createSwapRequest(dto);
		return ResponseEntity.status(HttpStatus.CREATED).body(req);
	}
	
    @PutMapping("/{swapId}/approve")
	public ResponseEntity<?> approveSwap(@PathVariable Long swapId, @RequestParam Long approverId){
		SwapRequest approveRequest = swapService.approveSwap(swapId, approverId);
		return ResponseEntity.ok(approveRequest);
	}
	
    @PutMapping("/{swapId}/reject")
	public ResponseEntity<?> rejectSwap(@PathVariable Long swapId, @RequestParam Long approverId){
		SwapRequest rejectRequest = swapService.rejectSwap(swapId, approverId);
		return ResponseEntity.ok(rejectRequest);
	}
	
	@GetMapping("/pending/{stationId}")
    public ResponseEntity<?> getPendingSwaps(@PathVariable Long stationId) {

        List<SwapRequest> pendingSwaps =
                swapService.getPendingRequestsByStation(stationId);

        return ResponseEntity.ok(pendingSwaps);
    }
}
