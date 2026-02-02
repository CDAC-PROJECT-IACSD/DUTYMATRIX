package com.DutyMatrix.dto;

import lombok.Data;

@Data
public class ResetPasswordRequestDTO {
    private String newPassword;
    private boolean returnSecureToken;
}
