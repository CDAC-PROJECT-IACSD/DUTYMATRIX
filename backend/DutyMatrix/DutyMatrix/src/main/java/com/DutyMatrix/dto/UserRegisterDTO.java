package com.DutyMatrix.dto;

import com.DutyMatrix.pojo.UserRank;
import com.DutyMatrix.pojo.UserRole;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class UserRegisterDTO {
	@NotBlank(message = "Name cannot be blank")
	private String uname;
	
	@Email
	@NotBlank
	private String uemail;
	
	@NotBlank
	@Size(min = 8, message = "Password should be atleast 8 character")
	@Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*])[A-Za-z\\d!@#$%^&*]{8,}$")
	private String upassword;
	
	@NotBlank
	@Pattern(regexp = "^[0-9]{10}$", message = "Phone number must be 10 digits")
	private String uphoneNo;
	
	@NotNull
	private UserRank urank;
	
	@NotNull
	private UserRole urole;

	@NotNull
	private Long station_id;
}
