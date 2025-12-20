package com.DutyMatrix.pojo;

import jakarta.annotation.Generated;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@Table(name="User")
public class User {

	//uid, uname, uemail, uphoneno, uemail,upassword,urank, urole;
	
	@Id
	@Column(name="user_id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int uid;
	@Column(name="user_name")
	private String uname;
	@Column(name="user_email")
	private String uemail;
	@Column(name="user_phoneNo")
	private String uphoneNo;
	@Column(name="user_password")
	private String upassword;
	@Enumerated(EnumType.STRING)
	private UserRank urank;
	@Enumerated(EnumType.STRING)
	private UserRole urole;
	
}
