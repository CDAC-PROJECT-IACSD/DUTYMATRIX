package com.DutyMatrix.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.DutyMatrix.custom_exception.ResourceNotFoundException;
import com.DutyMatrix.dto.SwapRequestDTO;
import com.DutyMatrix.notification.NotificationClient;
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

    // 🔔 Notification client (NEW)
    private final NotificationClient notificationClient;

    @Override
    public SwapRequest createSwapRequest(SwapRequestDTO dto, Long requesterId) {

        User requester = userRepo.findById(requesterId)
                .orElseThrow(() -> new ResourceNotFoundException("Requesting user not found"));

        User target = userRepo.findById(dto.getTargetUserId())
                .orElseThrow(() -> new ResourceNotFoundException("Target user not found"));

        Shift shift = shiftRepo.findById(dto.getShiftId())
                .orElseThrow(() -> new ResourceNotFoundException("Shift not found"));

        if (!shift.getAssignedUser().getUid().equals(requester.getUid())) {
            throw new IllegalStateException("Shift not assigned to requesting user");
        }

        if (!requester.getStation().getSid().equals(target.getStation().getSid())) {
            throw new IllegalStateException("Users must be from same station");
        }

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

        SwapRequest savedSwap = swapRepo.save(swap);

        // 🔔 NOTIFY STATION INCHARGE (NEW)
        userRepo.findByStation_SidAndUrole(
                requester.getStation().getSid(),
                UserRole.STATION_INCHARGE
        ).stream().findFirst().ifPresent(incharge ->
            notificationClient.send(
                incharge.getUid(),
                "Police Officer " + requester.getUname() +
                " requested a shift swap"
            )
        );

        return savedSwap;
    }

    @Override
    public SwapRequest approveSwap(Long swapId, Long approverId) {

        User approver = userRepo.findById(approverId)
                .orElseThrow(() -> new ResourceNotFoundException("Approver not found"));

        if (approver.getUrole() != UserRole.STATION_INCHARGE) {
            throw new IllegalStateException("Only Station Incharge can approve swap");
        }

        SwapRequest swap = swapRepo.findById(swapId)
                .orElseThrow(() -> new ResourceNotFoundException("Swap request not found"));

        if (swap.getStatus() != RequestStatus.PENDING) {
            throw new IllegalStateException("Request already processed");
        }

        if (!approver.getStation().getSid()
                .equals(swap.getShift().getStation().getSid())) {
            throw new IllegalStateException("Approver must belong to same station");
        }

        Shift shift = swap.getShift();
        shift.setAssignedUser(swap.getTargetUser());
        shiftRepo.save(shift);

        swap.setApprovedBy(approver);
        swap.setStatus(RequestStatus.APPROVED);

        // 🔔 NOTIFY BOTH OFFICERS (NEW)
        notificationClient.send(
            swap.getRequestingUser().getUid(),
            "Your shift swap has been approved"
        );

        notificationClient.send(
            swap.getTargetUser().getUid(),
            "Your shift swap has been approved"
        );

        return swap;
    }

    @Override
    public SwapRequest rejectSwap(Long swapId, Long approverId) {

        User approver = userRepo.findById(approverId)
                .orElseThrow(() -> new ResourceNotFoundException("Approver not found"));

        if (approver.getUrole() != UserRole.STATION_INCHARGE) {
            throw new IllegalStateException("Only Station Incharge can reject swap");
        }

        SwapRequest swap = swapRepo.findById(swapId)
                .orElseThrow(() -> new ResourceNotFoundException("Swap request not found"));

        swap.setApprovedBy(approver);
        swap.setStatus(RequestStatus.REJECTED);

        // 🔔 NOTIFY REQUESTER ONLY (NEW)
        notificationClient.send(
            swap.getRequestingUser().getUid(),
            "Your shift swap request has been rejected"
        );

        return swap;
    }

    @Override
    public List<SwapRequest> getPendingRequestsByStation(Long approverId) {

        User approver = userRepo.findById(approverId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        if (approver.getUrole() != UserRole.STATION_INCHARGE) {
            throw new RuntimeException("Access denied");
        }

        Long stationId = approver.getStation().getSid();

        return swapRepo.findByStatus(RequestStatus.PENDING)
                .stream()
                .filter(sr -> sr.getShift().getStation().getSid().equals(stationId))
                .toList();
    }

    @Override
    public List<SwapRequest> getAllSwapsForStation(Long stationId) {
        return swapRepo.findAll()
                .stream()
                .filter(sr -> sr.getShift().getStation().getSid().equals(stationId))
                .toList();
    }
}
