package com.DutyMatrix.dto;

import java.util.Date;
import com.DutyMatrix.pojo.ShiftType;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ShiftRequestDTO {

    private ShiftType shtype;
    private Date shStartTime;
    private Date shEndTime;
    private Date shDate;

    private Long stationId;      
    private Long assignedUserId; 
}
