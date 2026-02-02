package com.DutyMatrix.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.DutyMatrix.pojo.LeaveRequest;
import com.DutyMatrix.pojo.RequestStatus;
import com.DutyMatrix.pojo.UserRole;

public interface LeaveRepository extends JpaRepository<LeaveRequest, Long> {
	// Police leaves for Station Incharge (same station)
	@Query("""
			    SELECT l
			    FROM LeaveRequest l
			    WHERE l.lStatus = :status
			      AND l.uid.urole = :role
			      AND l.uid.station.sid = :stationId
			""")
	List<LeaveRequest> findPendingLeavesByRoleAndStation(@Param("status") RequestStatus status,
			@Param("role") UserRole role, @Param("stationId") Long stationId);

	// All pending leaves of a station (Commissioner view)
	@Query("""
			    SELECT l
			    FROM LeaveRequest l
			    WHERE l.lStatus = :status
			      AND l.uid.station.sid = :stationId
			""")
	List<LeaveRequest> findPendingLeavesByStation(@Param("status") RequestStatus status,
			@Param("stationId") Long stationId);
}