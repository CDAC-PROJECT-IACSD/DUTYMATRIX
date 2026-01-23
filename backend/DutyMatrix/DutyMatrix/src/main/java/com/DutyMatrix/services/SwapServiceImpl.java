package com.DutyMatrix.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.DutyMatrix.custom_exception.ResourceNotFoundException;
import com.DutyMatrix.dto.SwapRequestDTO;
import com.DutyMatrix.pojo.RequestStatus;
import com.DutyMatrix.pojo.Shift;
import com.DutyMatrix.pojo.SwapRequest;
import com.DutyMatrix.pojo.User;
import com.DutyMatrix.pojo.UserRole;
import com.DutyMatrix.repositories.ShiftRepository;
import com.DutyMatrix.repositories.SwapRequestRepository;
import com.DutyMatrix.repositories.UserRepository;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class SwapServiceImpl implements SwapService {

    private final SwapRequestRepository swapRepo;
    private final UserRepository userRepo;
    private final ShiftRepository shiftRepo;

    @Override
    public SwapRequest createSwapRequest(SwapRequestDTO dto) {

        User requester = userRepo.findById(dto.getRequestingUserId())
                .orElseThrow(() -> new ResourceNotFoundException("Requesting user not found"));

        User target = userRepo.findById(dto.getTargetUserId())
                .orElseThrow(() -> new ResourceNotFoundException("Target user not found"));

        Shift shift = shiftRepo.findById(dto.getShiftId())
                .orElseThrow(() -> new ResourceNotFoundException("Shift not found"));

        // Shift must belong to requester
        if (!shift.getAssignedUser().getUid().equals(requester.getUid())) {
            throw new IllegalStateException("Shift not assigned to requesting user");
        }

        // Same station
        if (!requester.getStation().getSid()
                .equals(target.getStation().getSid())) {
            throw new IllegalStateException("Users must be from same station");
        }

        // Only officers
        if (requester.getUrole() != UserRole.POLICE_OFFICER ||
            target.getUrole() != UserRole.POLICE_OFFICER) {
            throw new IllegalStateException("Only officers can swap shifts");
        }

        SwapRequest swap = new SwapRequest();
        swap.setRequestingUser(requester);
        swap.setTargetUser(target);
        swap.setShift(shift);
        swap.setReason(dto.getReason());
        swap.setStatus(RequestStatus.PENDING);

        return swapRepo.save(swap);
    	
    }

    @Override
    public SwapRequest approveSwap(Long swapId, Long approverId) {

        User approver = userRepo.findById(approverId)
                .orElseThrow(() -> new ResourceNotFoundException("Approver not found"));

        if (approver.getUrole() == UserRole.POLICE_OFFICER) {
            throw new IllegalStateException("Officer cannot approve swap");
        }

        SwapRequest swap = swapRepo.findById(swapId)
                .orElseThrow(() -> new ResourceNotFoundException("Swap request not found"));

        if (swap.getStatus() != RequestStatus.PENDING) {
            throw new IllegalStateException("Swap already processed");
        }

        // 🔁 REAL SWAP
        Shift shift = swap.getShift();
        shift.setAssignedUser(swap.getTargetUser());

        swap.setApprovedBy(approver);
        swap.setStatus(RequestStatus.APPROVED);

        return swap;
    	
    }

    @Override
    public SwapRequest rejectSwap(Long swapId, Long approverId) {

        User approver = userRepo.findById(approverId)
                .orElseThrow(() -> new ResourceNotFoundException("Approver not found"));

        if (approver.getUrole() == UserRole.POLICE_OFFICER) {
            throw new IllegalStateException("Officer cannot reject swap");
        }

        SwapRequest swap = swapRepo.findById(swapId)
                .orElseThrow(() -> new ResourceNotFoundException("Swap request not found"));

        swap.setApprovedBy(approver);
        swap.setStatus(RequestStatus.REJECTED);

        return swap;
    	
    }

    @Override
    public List<SwapRequest> getPendingRequestsByStation(Long stationId) {
        return swapRepo.findByStatus(RequestStatus.PENDING)
                .stream()
                .filter(sr -> sr.getShift().getStation().getSid().equals(stationId))
                .toList();
    	
    }
}