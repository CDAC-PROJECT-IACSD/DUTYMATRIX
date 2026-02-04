package com.DutyMatrix.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.DutyMatrix.pojo.History;

public interface HistoryRepository extends JpaRepository<History, Long> {

    // uid → User → uid
    List<History> findByUid_Uid(Long uid);
}
