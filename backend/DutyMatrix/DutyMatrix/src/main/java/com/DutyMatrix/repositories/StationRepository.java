package com.DutyMatrix.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.DutyMatrix.pojo.Station;

public interface StationRepository extends JpaRepository<Station, Long> {

}
