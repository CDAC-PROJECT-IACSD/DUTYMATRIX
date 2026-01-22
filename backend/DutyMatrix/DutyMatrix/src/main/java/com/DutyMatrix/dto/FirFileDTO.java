package com.DutyMatrix.dto;

import java.util.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FirFileDTO {
	
	private String complainantName;
	private String complainantPhone;
	
//	Crime details entered by officer
	private String crimeType;
	private String crimeDescription;
	private String crimeLocation;
	private Date crimeDateTime;
	
//	Legal and investigation information
	private String sectionsApplied;
	private Boolean accussedKnown;
	private String accusedName;
	private String severity;
	
//	User ID of officer filing FIR
	private Long filterByUserId;
}
