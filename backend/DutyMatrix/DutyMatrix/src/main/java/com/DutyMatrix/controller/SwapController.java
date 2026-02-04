package com.DutyMatrix.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.DutyMatrix.dto.JwtUserDTO;
import com.DutyMatrix.dto.SwapRequestDTO;
import com.DutyMatrix.dto.SwapResponseDTO;
import com.DutyMatrix.pojo.SwapRequest;
import com.DutyMatrix.services.SwapService;
import com.DutyMatrix.services.LoggerClient;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/swaps")
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class SwapController {

    private final SwapService swapService;
    private final LoggerClient loggerClient;   // ✅ LOGGER

    // 🔁 REQUEST SWAP
    @PreAuthorize("hasRole('POLICE_OFFICER')")
    @PostMapping
    public ResponseEntity<?> createSwap(
            @Valid @RequestBody SwapRequestDTO dto,
            @AuthenticationPrincipal JwtUserDTO user) {

        SwapRequest swap =
                swapService.createSwapRequest(dto, user.getUserId());

        loggerClient.logAction(
            "SHIFT_SWAP_REQUESTED",
            "Shift swap requested",
            user.getUserId()
        );

        SwapResponseDTO response = new SwapResponseDTO();
        response.setSwapId(swap.getSwapId());
        response.setStatus(swap.getStatus().name());
        response.setRequestingUser(swap.getRequestingUser().getUname());
        response.setTargetUser(swap.getTargetUser().getUname());
        response.setShiftType(swap.getShift().getShtype().name());

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    // ✅ APPROVE SWAP
    @PreAuthorize("hasRole('STATION_INCHARGE')")
    @PutMapping("/{swapId}/approve")
    public ResponseEntity<?> approveSwap(
            @PathVariable Long swapId,
            @AuthenticationPrincipal JwtUserDTO user) {

        SwapRequest swap =
                swapService.approveSwap(swapId, user.getUserId());

        loggerClient.logAction(
            "SHIFT_SWAP_APPROVED",
            "Shift swap approved",
            user.getUserId()
        );

        SwapResponseDTO response = new SwapResponseDTO();
        response.setSwapId(swap.getSwapId());
        response.setStatus(swap.getStatus().name());
        response.setRequestingUser(swap.getRequestingUser().getUname());
        response.setTargetUser(swap.getTargetUser().getUname());
        response.setShiftType(swap.getShift().getShtype().name());
        response.setApprovedBy(swap.getApprovedBy().getUname());

        return ResponseEntity.ok(response);
    }

    // ❌ REJECT SWAP
    @PreAuthorize("hasRole('STATION_INCHARGE')")
    @PutMapping("/{swapId}/reject")
    public ResponseEntity<?> rejectSwap(
            @PathVariable Long swapId,
            @AuthenticationPrincipal JwtUserDTO user) {

        SwapRequest swap =
                swapService.rejectSwap(swapId, user.getUserId());

        loggerClient.logAction(
            "SHIFT_SWAP_REJECTED",
            "Shift swap rejected",
            user.getUserId()
        );

        SwapResponseDTO response = new SwapResponseDTO();
        response.setSwapId(swap.getSwapId());
        response.setStatus(swap.getStatus().name());
        response.setRequestingUser(swap.getRequestingUser().getUname());
        response.setTargetUser(swap.getTargetUser().getUname());
        response.setShiftType(swap.getShift().getShtype().name());
        response.setApprovedBy(swap.getApprovedBy().getUname());

        return ResponseEntity.ok(response);
    }

    @GetMapping("/pending")
    @PreAuthorize("hasRole('STATION_INCHARGE')")
    public ResponseEntity<?> getPendingSwaps(
            @AuthenticationPrincipal JwtUserDTO user) {

        return ResponseEntity.ok(
            swapService.getPendingRequestsByStation(user.getUserId())
        );
    }

    @PreAuthorize("hasRole('COMMISSIONER')")
    @GetMapping("/all")
    public ResponseEntity<?> getAllSwapsForCommissioner(
            @AuthenticationPrincipal JwtUserDTO user) {

        List<SwapResponseDTO> response =
            swapService.getAllSwapsForStation(user.getStationId())
                .stream()
                .map(swap -> {
                    SwapResponseDTO dto = new SwapResponseDTO();
                    dto.setSwapId(swap.getSwapId());
                    dto.setStatus(swap.getStatus().name());
                    dto.setRequestingUser(swap.getRequestingUser().getUname());
                    dto.setTargetUser(swap.getTargetUser().getUname());
                    dto.setShiftType(swap.getShift().getShtype().name());
                    dto.setApprovedBy(
                        swap.getApprovedBy() != null
                            ? swap.getApprovedBy().getUname()
                            : null
                    );
                    return dto;
                })
                .toList();

        return ResponseEntity.ok(response);
    }
}
