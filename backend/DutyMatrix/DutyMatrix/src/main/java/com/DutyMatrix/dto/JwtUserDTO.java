package com.DutyMatrix.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class JwtUserDTO {
    private Long userId;
    private String email;
    private String role;
    private Long stationId;
}
