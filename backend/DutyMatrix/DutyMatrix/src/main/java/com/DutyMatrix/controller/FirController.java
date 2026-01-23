package com.DutyMatrix.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.DutyMatrix.dto.FirFileDTO;
import com.DutyMatrix.dto.FirResponseDTO;
import com.DutyMatrix.pojo.FIR;
import com.DutyMatrix.services.FirFileService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/fir")
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class FirController {

    private final FirFileService firService;

    @PostMapping
    public ResponseEntity<?> fileFIR(@RequestBody FirFileDTO firDto) {

        FIR fir = firService.fileFir(firDto);

        FirResponseDTO dto = new FirResponseDTO();
        dto.setFirId(fir.getFirId());
        dto.setFiledBy(fir.getFiledBy().getUname());
        dto.setStationName(fir.getStation().getSname());
        dto.setInvestigatingOfficer("Not Assigned");
        dto.setStatus(fir.getStatus().name());

        return ResponseEntity.ok(dto);
    }

    @PutMapping("/{firId}/assign")
    public ResponseEntity<?> assignOfficer(
            @PathVariable Long firId,
            @RequestParam Long officerId) {

        FIR fir = firService.assignInvestigatingOfficer(firId, officerId);

        FirResponseDTO dto = new FirResponseDTO();
        dto.setFirId(fir.getFirId());
        dto.setFiledBy(fir.getFiledBy().getUname());
        dto.setStationName(fir.getStation().getSname());
        dto.setInvestigatingOfficer(fir.getInvestigatingOfficer().getUname());
        dto.setStatus(fir.getStatus().name());

        return ResponseEntity.ok(dto);
    }

    @GetMapping("/station/{stationId}")
    public ResponseEntity<?> listByStation(@PathVariable Long stationId) {
        return ResponseEntity.ok(firService.getAllFirsByStation(stationId));
    }
}
