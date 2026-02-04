package com.DutyMatrix.services;

import com.DutyMatrix.dto.LoginRequestDTO;
import com.DutyMatrix.dto.LoginResponseDTO;

public interface AuthService {
	LoginResponseDTO login(LoginRequestDTO request);
	
	public void resetPassword(String token, String newPassword);
	public String sendOtp(String email);
	 public String verifyOtpAndReset(String email, String otp, String newPassword);

}
