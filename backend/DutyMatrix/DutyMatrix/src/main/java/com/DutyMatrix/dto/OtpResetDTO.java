package com.DutyMatrix.dto;

import lombok.Data;

@Data
public class OtpResetDTO {
    private String email;
    private String otp;
    private String newPassword;
}
