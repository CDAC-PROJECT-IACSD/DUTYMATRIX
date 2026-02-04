package com.DutyMatrix.repositories;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.DutyMatrix.pojo.Shift;

@Repository
public interface ShiftRepository extends JpaRepository<Shift, Long> {
	List<Shift> findByStation_Sid(Long stationId);
	List<Shift> findByStation_SidAndShDate(Long stationId, LocalDate shDate);
	List<Shift> findByAssignedUser_Uid(Long userId);
}
