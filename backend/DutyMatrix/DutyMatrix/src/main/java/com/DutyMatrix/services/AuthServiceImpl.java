package com.DutyMatrix.services;

import java.time.LocalDateTime;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.DutyMatrix.dto.LoginRequestDTO;
import com.DutyMatrix.dto.LoginResponseDTO;
import com.DutyMatrix.pojo.PasswordResetOtp;
import com.DutyMatrix.pojo.User;
import com.DutyMatrix.repositories.PasswordResetOtpRepository;
import com.DutyMatrix.repositories.UserRepository;
import com.DutyMatrix.security.JwtUtils;
import com.DutyMatrix.security.OtpUtil;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final PasswordResetOtpRepository otpRepository;
    private final JwtUtils jwtUtils;
    private final OtpUtil otpUtil;
    private final EmailService emailService;

    // ---------------- LOGIN ----------------
    @Override
    public LoginResponseDTO login(LoginRequestDTO request) {
        User user = userRepository.findByUemail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));

        if (!passwordEncoder.matches(request.getPassword(), user.getUpassword())) {
            throw new RuntimeException("Invalid email or password");
        }

        Long stationId = (user.getStation() != null) ? user.getStation().getSid() : null;

        String token = jwtUtils.generateToken(
                user.getUid(),
                user.getUemail(),
                user.getUrole().name(),
                stationId
        );

        return new LoginResponseDTO(
                user.getUid(),
                user.getUname(),
                user.getUemail(),
                user.getUrole(),
                stationId,
                token
        );
    }

    // ---------------- RESET PASSWORD (JWT) ----------------
    @Override
    public void resetPassword(String token, String newPassword) {

        String email = jwtUtils.extractUsername(token);

        User user = userRepository.findByUemail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setUpassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
    }

    // ---------------- SEND OTP ----------------
    @Override
    @Transactional
    public String sendOtp(String email) {

        User user = userRepository.findByUemail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // ✅ DELETE requires transaction
        otpRepository.deleteByEmail(email);

        String otp = otpUtil.generateOtp();

        PasswordResetOtp resetOtp = new PasswordResetOtp();
        resetOtp.setEmail(email);
        resetOtp.setOtp(otp);
        resetOtp.setExpiryTime(LocalDateTime.now().plusMinutes(5));

        otpRepository.save(resetOtp);

        emailService.sendOtp(email, otp);

        return "OTP sent to email";
    }

    // ---------------- VERIFY OTP + RESET ----------------
    @Override
    @Transactional
    public String verifyOtpAndReset(String email, String otp, String newPassword) {

        PasswordResetOtp resetOtp = otpRepository
                .findByEmailAndOtp(email, otp)
                .orElseThrow(() -> new RuntimeException("Invalid OTP"));

        if (resetOtp.getExpiryTime().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("OTP expired");
        }

        User user = userRepository.findByUemail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setUpassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);

        // ✅ DELETE requires transaction
        otpRepository.deleteByEmail(email);

        return "Password reset successful";
    }
}
