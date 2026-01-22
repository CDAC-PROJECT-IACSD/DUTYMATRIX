package com.DutyMatrix.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.DutyMatrix.pojo.Shift;

@Repository
public interface ShiftRepository extends JpaRepository<Shift, Long> {

}
