package com.DutyMatrix.controller;

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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.DutyMatrix.custom_exception.ResourceNotFoundException;
import com.DutyMatrix.dto.FirFileDTO;
import com.DutyMatrix.dto.FirResponseDTO;
import com.DutyMatrix.dto.JwtUserDTO;
import com.DutyMatrix.pojo.FIR;
import com.DutyMatrix.pojo.User;
import com.DutyMatrix.repositories.UserRepository;
import com.DutyMatrix.services.FirFileService;
import com.DutyMatrix.services.LoggerClient;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/fir")
@AllArgsConstructor
public class FirController {

    private final FirFileService firService;
    private final UserRepository userRepository;
    private final LoggerClient loggerClient;   // ✅ LOGGER INJECTED

    // ✅ FIR CREATED
    @PostMapping
    public ResponseEntity<?> fileFIR(@Valid @RequestBody FirFileDTO firDto) {

        FIR fir = firService.fileFir(firDto);

        // 🔥 LOG FIR CREATED
        loggerClient.logAction(
            "FIR_CREATED",
            "FIR created successfully",
            fir.getFiledBy().getUid()   // user who filed FIR
        );

        FirResponseDTO dto = new FirResponseDTO();
        dto.setFirId(fir.getFirId());
        dto.setFiledBy(fir.getFiledBy().getUname());
        dto.setStationName(fir.getStation().getSname());
        dto.setInvestigatingOfficer("Not Assigned");
        dto.setStatus(fir.getStatus().name());

        return ResponseEntity.status(HttpStatus.CREATED).body(dto);
    }

    // ✅ FIR ASSIGNED
    @PreAuthorize("hasRole('STATION_INCHARGE')")
    @PutMapping("/{firId}/assign")
    public ResponseEntity<?> assignOfficer(
            @PathVariable Long firId,
            @RequestParam Long officerId) {

        FIR fir = firService.assignInvestigatingOfficer(firId, officerId);

        // 🔥 LOG FIR ASSIGNED
        loggerClient.logAction(
            "FIR_ASSIGNED",
            "Investigating officer assigned to FIR",
            officerId
        );

        return ResponseEntity.ok("Officer assigned successfully");
    }

    @GetMapping("/station/{stationId}")
    public ResponseEntity<?> listByStation(@PathVariable Long stationId) {
        return ResponseEntity.ok(firService.getAllFirsByStation(stationId));
    }

    @PreAuthorize("hasRole('COMMISSIONER')")
    @GetMapping("/all")
    public ResponseEntity<?> getAllFirsForCommissioner() {
        return ResponseEntity.ok(firService.getAllFirs());
    }

    @PreAuthorize("hasRole('STATION_INCHARGE')")
    @GetMapping("/station-incharge")
    public ResponseEntity<?> getFirsForStationIncharge(
            @AuthenticationPrincipal JwtUserDTO user) {

        User incharge = userRepository.findByUid(user.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        return ResponseEntity.ok(
                firService.getAllFirsByStation(incharge.getStation().getSid())
        );
    }
}
