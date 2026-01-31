package com.DutyMatrix.pojo;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "leaveRequest")
@NoArgsConstructor

@Setter
@Getter
@ToString
public class LeaveRequest {

	@Column(name = "leaveRequest_id")
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long lid;
	@Column(name = "leaveRequest_StartDate")
	private Date lStatDate;
	@Column(name = "leaveRequest_EndDate")
	private Date lEndDate;
	@Enumerated(EnumType.STRING)
	private RequestStatus lStatus;
	@Column(name = "leaveRequest_Reason")
	private String lReason;
	
	@ManyToOne
	@JoinColumn(name = "approved_by")
	private User lapprovedBy;

	
	//fk
	@JoinColumn(name="userId",nullable= false)
	@ManyToOne
	private User uid;

}
