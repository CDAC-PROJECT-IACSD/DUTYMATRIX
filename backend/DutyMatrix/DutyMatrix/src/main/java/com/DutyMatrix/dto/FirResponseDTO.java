package com.DutyMatrix.dto;

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
}
