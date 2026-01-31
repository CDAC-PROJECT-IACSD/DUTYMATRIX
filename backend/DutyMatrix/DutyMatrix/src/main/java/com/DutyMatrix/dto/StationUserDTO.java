package com.DutyMatrix.dto;

import com.DutyMatrix.pojo.UserRank;
import com.DutyMatrix.pojo.UserRole;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class StationUserDTO {

    private Long userId;
    private String name;
    private UserRole role;
    private UserRank rank;
}
