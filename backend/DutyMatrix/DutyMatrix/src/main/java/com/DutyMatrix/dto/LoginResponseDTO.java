package com.DutyMatrix.dto;

import com.DutyMatrix.pojo.UserRole;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class LoginResponseDTO {

    private Long userId;
    private String userName;
    private String email;
    private UserRole role;
    private Long stationId;
    private String token;
}
