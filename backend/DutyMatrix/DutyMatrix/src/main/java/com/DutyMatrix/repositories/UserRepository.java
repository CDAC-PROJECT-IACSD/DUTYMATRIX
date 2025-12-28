package com.DutyMatrix.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.DutyMatrix.pojo.User;

public interface UserRepository extends JpaRepository<User, Long> {

	boolean existsByUemail(String uemail);


}
