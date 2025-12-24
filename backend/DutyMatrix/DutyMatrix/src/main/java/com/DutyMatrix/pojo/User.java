package com.DutyMatrix.pojo;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@NoArgsConstructor
@Table(name="users")
//
@Getter
@Setter
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
	
	@ManyToOne
<<<<<<< HEAD
    @JoinColumn(name = "station_id", nullable = false)
=======
	@JoinColumn(name="Station_id")
>>>>>>> d2e98066516dc399808b5e905b40282335b9884c
	private Station station;
	
	
	
}
