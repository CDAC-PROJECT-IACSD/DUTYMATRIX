package com.DutyMatrix.dto;

import com.DutyMatrix.pojo.ActionType;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LogRequestDTO {
    private ActionType hactionType;
    private String hactionDescription;
    private Long userId;
}
