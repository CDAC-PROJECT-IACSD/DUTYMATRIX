package com.DutyMatrix.services;

import java.util.Date;
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
	public FIR fileFir(FirFileDTO firdto) {
		User user = userRepo.findById(firdto.getFilledByUserId()).orElseThrow(()-> new ResourceNotFoundException("No user found"));
		
		if (user.getUrole() == UserRole.POLICE_OFFICER) {
		    throw new IllegalStateException("Police officer cannot file FIR");
		}

				
		FIR fir = new FIR();
		fir.setComplainantName(firdto.getComplainantName());
		fir.setComplainantPhone(firdto.getComplainantPhone());
		fir.setAccusedName(firdto.getAccusedName());
		fir.setAccussedKnown(firdto.getAccussedKnown());
		fir.setCrimeDateTime(firdto.getCrimeDateTime());
		fir.setCrimeDescription(firdto.getCrimeDescription());
		fir.setCrimeLocation(firdto.getCrimeLocation());
		fir.setCrimeType(firdto.getCrimeType());
		fir.setSectionsApplied(firdto.getSectionsApplied());
		fir.setSeverity(firdto.getSeverity());
		
		fir.setFiledBy(user);
		fir.setStation(user.getStation());
		fir.setFirDateTime(new Date());
		fir.setStatus(FIRStatus.FILED);
		
		return firRepo.save(fir);
	}

	@Override
	public FIR assignInvestigatingOfficer(Long firId, Long officerId) {
		FIR fir = firRepo.findById(firId).orElseThrow(()-> new ResourceNotFoundException("No FIR Exists..."));
		
		User user = userRepo.findById(officerId).orElseThrow(()-> new ResourceNotFoundException("No user found..."));
		
		fir.setInvestigatingOfficer(user);
		fir.setStatus(FIRStatus.UNDER_INVESTIGATION);
		
		return fir;
	}

	@Override
    public List<FirResponseDTO> getAllFirsByStation(Long stationId) {

        return firRepo.findByStationSid(stationId)
                .stream()
                .map(fir -> {
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
                    return dto;
                })
                .toList();
    }

}
