package com.DutyMatrix.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.DutyMatrix.pojo.FIR;

public interface FirRepository extends JpaRepository<FIR, Long> {

	List<FIR> findByStationSid(Long stationId);

}
