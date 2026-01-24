package com.DutyMatrix.services;

import com.DutyMatrix.dto.LoginRequestDTO;
import com.DutyMatrix.dto.LoginResponseDTO;

public interface AuthService {
	LoginResponseDTO login(LoginRequestDTO request);
}
