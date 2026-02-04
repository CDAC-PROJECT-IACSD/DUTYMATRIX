package com.DutyMatrix.security;

import java.util.Random;

import org.springframework.stereotype.Component;

@Component
public class OtpUtil {

    public String generateOtp() {
        return String.valueOf(
            100000 + new Random().nextInt(900000)
        ); // 6‑digit
    }
}
