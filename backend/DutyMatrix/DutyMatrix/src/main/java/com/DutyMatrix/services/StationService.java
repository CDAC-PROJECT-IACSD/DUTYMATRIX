package com.DutyMatrix.services;

import com.DutyMatrix.dto.StationRegisterDTO;

public interface StationService {

	//registration for station
	String registerStation(StationRegisterDTO stationRegisterDTO);
}
