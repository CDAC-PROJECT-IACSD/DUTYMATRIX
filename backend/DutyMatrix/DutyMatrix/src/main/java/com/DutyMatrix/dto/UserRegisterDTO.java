package com.DutyMatrix.dto;

import com.DutyMatrix.pojo.UserRank;
import com.DutyMatrix.pojo.UserRole;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class UserRegisterDTO {
	private String uname;
	private String uemail;
	private String uphoneNo;
	private String upassword;
	private UserRank urank;
	private UserRole urole;

	private Long station_id;
}
