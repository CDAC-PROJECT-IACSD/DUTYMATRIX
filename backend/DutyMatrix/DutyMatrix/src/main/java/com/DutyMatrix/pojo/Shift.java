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
@Table(name= "shifts")
@NoArgsConstructor

@Setter
@Getter
@ToString
public class Shift {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="shift_id")
	private Long shid;
	
	@Enumerated(EnumType.STRING)
	@Column(name = "shift_type")
	private ShiftType shtype;
	
	@Column(name = "shift_startTime")
	private Date shStartTime;
	@Column(name = "shift_endTime")
	private Date shEndTime;
	@Column(name = "shift_date")
	private Date shDate;
	
	//station fk
	@ManyToOne
	@JoinColumn(name="station_id", nullable= false)
	private Station station;
	
}
