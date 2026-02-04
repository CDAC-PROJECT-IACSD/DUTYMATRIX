package com.DutyMatrix.services;

import java.time.LocalDate;
import java.util.List;

import com.DutyMatrix.dto.ShiftRequestDTO;
import com.DutyMatrix.dto.ShiftSummaryDTO;

public interface ShiftService {
    String createShift(ShiftRequestDTO dto, Long long1);
    
    List<ShiftSummaryDTO> getShiftsForStation(Long stationId);
    
    List<ShiftSummaryDTO> getShiftsForStationAndDate(Long stationId, LocalDate date);

    List<ShiftSummaryDTO> getShiftsByOfficer(Long userId);
}



