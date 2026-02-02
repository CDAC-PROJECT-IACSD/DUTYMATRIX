package com.DutyMatrix.dto;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FirFileDTO {

    // Complainant details
    @NotBlank(message = "Complainant name is required")
    @Size(min = 3, max = 50, message = "Complainant name must be 3–50 characters")
    private String complainantName;

    @NotBlank(message = "Complainant phone is required")
    @Pattern(regexp = "^[0-9]{10}$", message = "Phone number must be 10 digits")
    private String complainantPhone;

    // Crime details entered by officer
    @NotBlank(message = "Crime type is required")
    private String crimeType;

    @NotBlank(message = "Crime description is required")
    @Size(min = 10, message = "Crime description must be at least 10 characters")
    private String crimeDescription;

    @NotBlank(message = "Crime location is required")
    private String crimeLocation;

    @NotNull(message = "Crime date and time is required")
//    @PastOrPresent(message = "Crime date cannot be in the future")
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime crimeDateTime;

    // Legal and investigation information
    @NotBlank(message = "IPC sections are required")
    private String sectionsApplied;

    @NotNull(message = "Please specify whether accused is known or not")
    private Boolean accussedKnown;

    private String accusedName;


    @NotBlank(message = "Severity is required")
    private String severity;

    // User ID of officer filing FIR
    @NotNull(message = "Filing officer ID is required")
    private Long filledByUserId;
}
