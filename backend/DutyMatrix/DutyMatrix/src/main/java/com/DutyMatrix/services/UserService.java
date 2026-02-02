package com.DutyMatrix.services;

import com.DutyMatrix.dto.UserRegisterDTO;
import com.DutyMatrix.dto.StationUserDTO;
import java.util.List;

public interface UserService {
	String registerUser(UserRegisterDTO userRegisterDTO);
	
	List<StationUserDTO> getOfficersByStation(Long stationId);
	
}
