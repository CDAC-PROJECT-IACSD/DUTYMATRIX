package com.DutyMatrix.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SwapRequestDTO {

    @NotNull(message = "Requesting user ID is required")
    private Long requestingUserId;

    @NotNull(message = "Target user ID is required")
    private Long targetUserId;

    @NotNull(message = "Shift ID is required")
    private Long shiftId;

    @NotBlank(message = "Reason for swap is required")
    private String reason;
}
