package com.DutyMatrix.dto;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FirResponseDTO {
	private Long firId;
    private String status;
    private String stationName;
    private String filedBy;
    private String investigatingOfficer;
    private String crimeDescription;
    private LocalDateTime crimeDateTime;	
}
