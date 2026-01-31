package com.DutyMatrix.services;

import java.util.List;

import com.DutyMatrix.dto.StationRegisterDTO;
import com.DutyMatrix.dto.StationSummaryDTO;

public interface StationService {

	//registration for station
	String registerStation(StationRegisterDTO stationRegisterDTO);
	

	StationSummaryDTO getStationSummaryByStationId(Long stationId);
}
