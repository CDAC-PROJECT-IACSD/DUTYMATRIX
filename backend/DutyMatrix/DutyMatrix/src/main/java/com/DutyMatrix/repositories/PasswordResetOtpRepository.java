package com.DutyMatrix.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.DutyMatrix.pojo.PasswordResetOtp;

public interface PasswordResetOtpRepository
        extends JpaRepository<PasswordResetOtp, Long> {

    Optional<PasswordResetOtp> findByEmailAndOtp(String email, String otp);
    void deleteByEmail(String email);
}
