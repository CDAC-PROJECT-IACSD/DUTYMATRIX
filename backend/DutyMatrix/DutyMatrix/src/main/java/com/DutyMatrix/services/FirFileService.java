package com.DutyMatrix.services;

import java.util.List;

import com.DutyMatrix.dto.FirFileDTO;
import com.DutyMatrix.dto.FirResponseDTO;
import com.DutyMatrix.pojo.FIR;

public interface FirFileService {
	
	// Register new FIR
	FIR fileFir(FirFileDTO firdto);
	
	//Assign Investigating Officer to the case
	FIR assignInvestigatingOfficer(Long firId, Long officerId);
	
	// List all the FIRs of a particular station
	List<FirResponseDTO> getAllFirsByStation(Long stationId);
	
}
