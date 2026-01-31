package com.DutyMatrix.services;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.DutyMatrix.dto.StationRegisterDTO;
import com.DutyMatrix.dto.StationSummaryDTO;
import com.DutyMatrix.dto.StationUserDTO;
import com.DutyMatrix.pojo.Station;
import com.DutyMatrix.pojo.UserRole;
import com.DutyMatrix.repositories.StationRepository;
import com.DutyMatrix.repositories.UserRepository;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class StationServiceImpl implements StationService {
	private final StationRepository stationRepo;
	private final ModelMapper mapper;
	private final UserRepository userRepo;

	@Override
	public String registerStation(StationRegisterDTO stationRegisterDTO) {

		Station station = mapper.map(stationRegisterDTO, Station.class);

		stationRepo.save(station);

		return "New Station is Created";
	}

	@Override
    public StationSummaryDTO getStationSummaryByStationId(Long stationId) {

        Station station = stationRepo.findById(stationId)
                .orElseThrow(() -> new RuntimeException("Station not found"));

        List<UserRole> visibleRoles = List.of(
                UserRole.POLICE_OFFICER,
                UserRole.STATION_INCHARGE
        );

        List<StationUserDTO> users =
                userRepo.findByStation_SidAndUroleIn(station.getSid(), visibleRoles)
                        .stream()
                        .map(u -> new StationUserDTO(
                                u.getUid(),
                                u.getUname(),
                                u.getUrole(),
                                u.getUrank()
                        ))
                        .toList();

        return new StationSummaryDTO(
                station.getSid(),
                station.getSname(),
                station.getSloc(),
                users
        );
    }

}
