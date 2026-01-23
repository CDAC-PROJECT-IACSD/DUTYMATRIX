package com.DutyMatrix.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.DutyMatrix.pojo.LeaveRequest;

public interface LeaveRepository extends JpaRepository<LeaveRequest, Long> {
}
