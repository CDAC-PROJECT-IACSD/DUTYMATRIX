package com.DutyMatrix.services;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.DutyMatrix.dto.StationRegisterDTO;
import com.DutyMatrix.pojo.Station;
import com.DutyMatrix.repositories.StationRepository;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class StationServiceImpl implements StationService
{
	private final StationRepository stationRepo;
	private final ModelMapper mapper;
	
	@Override
	public String registerStation(StationRegisterDTO stationRegisterDTO) {
		
		Station station =  mapper.map(stationRegisterDTO, Station.class);
		
		stationRepo.save(station);
		
		return "New Station is Created";
	}

	
}
