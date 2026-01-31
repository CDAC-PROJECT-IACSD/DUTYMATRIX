package com.DutyMatrix.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class StationSummaryDTO {

    private Long stationId;
    private String stationName;
    private String location;
    private List<StationUserDTO> users;
}
