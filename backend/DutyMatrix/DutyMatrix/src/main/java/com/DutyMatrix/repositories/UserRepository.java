package com.DutyMatrix.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.DutyMatrix.pojo.User;
import com.DutyMatrix.pojo.UserRole;

public interface UserRepository extends JpaRepository<User, Long> {

	boolean existsByUemail(String uemail);

	Optional<User> findByUemail(String uemail);

	Optional<User> findByUid(Long uid);

	List<User> findByStationSid(Long stationId);

	List<User> findByStation_SidAndUroleIn(Long sid, List<UserRole> roles);

	List<User> findByStation_SidAndUrole(Long sid, UserRole stationIncharge);

	Optional<User> findByUrole(UserRole commissioner);}
