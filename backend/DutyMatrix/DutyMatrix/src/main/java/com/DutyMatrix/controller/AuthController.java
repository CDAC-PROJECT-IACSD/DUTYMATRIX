package com.DutyMatrix.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.DutyMatrix.dto.LoginRequestDTO;
import com.DutyMatrix.dto.LoginResponseDTO;
import com.DutyMatrix.dto.OtpResetDTO;
import com.DutyMatrix.dto.ResetPasswordRequestDTO;
import com.DutyMatrix.services.AuthService;
import com.DutyMatrix.services.LoggerClient;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/auth")
@AllArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final LoggerClient loggerClient;

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(
            @RequestBody LoginRequestDTO dto) {

        LoginResponseDTO response = authService.login(dto);

        // ✅ SAFE LOGGER CALL
        try {
            loggerClient.logAction(
                "LOGIN",
                "User logged in successfully",
                response.getUserId()
            );
        } catch (Exception e) {
            System.out.println("Logger service unavailable, skipping login log");
        }

        return ResponseEntity.ok(response);
    }

    // ✅ LOGOUT API
    @PostMapping("/logout")
    public ResponseEntity<String> logout(@RequestParam Long userId) {

        // ✅ SAFE LOGGER CALL
        try {
            loggerClient.logAction(
                "LOGOUT",
                "User logged out successfully",
                userId
            );
        } catch (Exception e) {
            System.out.println("Logger service unavailable, skipping logout log");
        }

        return ResponseEntity.ok("Logged out successfully");
    }

    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(
            @RequestHeader("Authorization") String authHeader,
            @RequestBody ResetPasswordRequestDTO request) {

        String token = authHeader.replace("Bearer ", "");
        authService.resetPassword(token, request.getNewPassword());

        return ResponseEntity.ok("Password reset successful");
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<String> forgotPassword(
            @RequestParam String email) {

        return ResponseEntity.ok(authService.sendOtp(email));
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<String> verifyOtp(
            @RequestBody OtpResetDTO dto) {

        return ResponseEntity.ok(
            authService.verifyOtpAndReset(
                dto.getEmail(),
                dto.getOtp(),
                dto.getNewPassword()
            )
        );
    }
}
