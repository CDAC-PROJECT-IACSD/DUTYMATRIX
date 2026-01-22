package com.DutyMatrix.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.DutyMatrix.dto.FirFileDTO;
import com.DutyMatrix.pojo.FIR;
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
		
		return null;
	}

	@Override
	public FIR assignInvestigatingOfficer(int firId, int officerId) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<FIR> getAllFirsByStation(int stationId) {
		// TODO Auto-generated method stub
		return null;
	}

}
