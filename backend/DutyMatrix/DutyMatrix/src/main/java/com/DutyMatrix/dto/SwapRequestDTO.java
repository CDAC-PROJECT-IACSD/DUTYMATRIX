package com.DutyMatrix.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class SwapRequestDTO {
	private Long requestingUserId;
	private Long targetUserId;
	private Long shiftId;
	private String reason;
}
