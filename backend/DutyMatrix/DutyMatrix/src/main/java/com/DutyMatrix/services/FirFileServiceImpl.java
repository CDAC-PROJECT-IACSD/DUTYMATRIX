package com.DutyMatrix.services;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.DutyMatrix.custom_exception.ResourceNotFoundException;
import com.DutyMatrix.dto.FirFileDTO;
import com.DutyMatrix.dto.FirResponseDTO;
import com.DutyMatrix.pojo.FIR;
import com.DutyMatrix.pojo.FIRStatus;
import com.DutyMatrix.pojo.User;
import com.DutyMatrix.pojo.UserRole;
import com.DutyMatrix.repositories.FirRepository;
import com.DutyMatrix.repositories.UserRepository;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class FirFileServiceImpl implements FirFileService {

    private final FirRepository firRepo;
    private final UserRepository userRepo;

    @Override
    public FIR fileFir(FirFileDTO dto) {

        User officer = userRepo.findById(dto.getFilledByUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        if (officer.getUrole() != UserRole.POLICE_OFFICER) {
            throw new RuntimeException("Only Police Officers can file FIR");
        }

        FIR fir = new FIR();
        fir.setComplainantName(dto.getComplainantName());
        fir.setComplainantPhone(dto.getComplainantPhone());
        fir.setCrimeType(dto.getCrimeType());
        fir.setCrimeDescription(dto.getCrimeDescription());
        fir.setCrimeLocation(dto.getCrimeLocation());
        fir.setCrimeDateTime(dto.getCrimeDateTime());
        fir.setSectionsApplied(dto.getSectionsApplied());
        fir.setSeverity(dto.getSeverity());
        fir.setAccussedKnown(dto.getAccussedKnown());
        fir.setAccusedName(dto.getAccussedKnown() ? dto.getAccusedName() : null);

        fir.setFiledBy(officer);
        fir.setStation(officer.getStation());
        fir.setFirDateTime(LocalDateTime.now());
        fir.setStatus(FIRStatus.FILED);

        return firRepo.save(fir);
    }

    @Override
    public FIR assignInvestigatingOfficer(Long firId, Long officerId) {

        FIR fir = firRepo.findById(firId)
                .orElseThrow(() -> new ResourceNotFoundException("FIR not found"));

        User officer = userRepo.findById(officerId)
                .orElseThrow(() -> new ResourceNotFoundException("Officer not found"));

        fir.setInvestigatingOfficer(officer);
        fir.setStatus(FIRStatus.UNDER_INVESTIGATION);

        return fir;
    }

    @Override
    public List<FirResponseDTO> getAllFirsByStation(Long stationId) {

        return firRepo.findByStation_Sid(stationId).stream().map(fir -> {
            FirResponseDTO dto = new FirResponseDTO();
            dto.setFirId(fir.getFirId());
            dto.setFiledBy(fir.getFiledBy().getUname());
            dto.setStationName(fir.getStation().getSname());
            dto.setInvestigatingOfficer(
                fir.getInvestigatingOfficer() != null
                    ? fir.getInvestigatingOfficer().getUname()
                    : "Not Assigned"
            );
            dto.setStatus(fir.getStatus().name());
            dto.setCrimeDescription(fir.getCrimeDescription());
            dto.setCrimeDateTime(fir.getCrimeDateTime());
            return dto;
        }).toList();
    }

    @Override
    public List<FirResponseDTO> getAllFirs() {

        return firRepo.findAll().stream().map(fir -> {
            FirResponseDTO dto = new FirResponseDTO();
            dto.setFirId(fir.getFirId());
            dto.setFiledBy(fir.getFiledBy().getUname());
            dto.setStationName(fir.getStation().getSname());
            dto.setInvestigatingOfficer(
                fir.getInvestigatingOfficer() != null
                    ? fir.getInvestigatingOfficer().getUname()
                    : "Not Assigned"
            );
            dto.setStatus(fir.getStatus().name());
            dto.setCrimeDescription(fir.getCrimeDescription());
            dto.setCrimeDateTime(fir.getCrimeDateTime());
            return dto;
        }).toList();
    }
}
