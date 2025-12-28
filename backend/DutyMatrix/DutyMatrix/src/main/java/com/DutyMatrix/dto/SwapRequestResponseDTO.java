package com.DutyMatrix.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class SwapRequestResponseDTO {
	private Long swapId;
	private String status;
	private String shiftType;
	private String requestingUser;
	private String targetUser;
	
}
