package com.DutyMatrix.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SwapResponseDTO {

    private Long swapId;
    private String status;
    private String requestingUser;
    private String targetUser;
    private String shiftType;
    private String approvedBy;
}
