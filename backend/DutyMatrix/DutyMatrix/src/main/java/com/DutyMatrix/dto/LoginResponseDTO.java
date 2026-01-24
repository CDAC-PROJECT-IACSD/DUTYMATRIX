package com.DutyMatrix.dto;

import com.DutyMatrix.pojo.UserRole;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginResponseDTO {

    private Long userId;
    private String userName;
    private String email;
    private UserRole role;
    private Long stationId;
}
