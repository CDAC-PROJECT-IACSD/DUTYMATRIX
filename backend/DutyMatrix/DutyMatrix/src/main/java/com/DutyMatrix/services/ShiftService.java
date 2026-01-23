package com.DutyMatrix.services;

import com.DutyMatrix.dto.ShiftRequestDTO;
import com.DutyMatrix.dto.ShiftResponseDTO;
import com.DutyMatrix.pojo.User;

public interface ShiftService {
    ShiftResponseDTO createShift(ShiftRequestDTO dto, User loggedInUser);
}



