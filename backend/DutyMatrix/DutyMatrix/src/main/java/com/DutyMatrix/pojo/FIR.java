package com.DutyMatrix.pojo;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "firs")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FIR {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long firId;
	private String complainantName;
	private String complainantPhone;
	private String crimeType;
	private String crimeDescription;
	private String crimeLocation;
	private LocalDateTime crimeDateTime;
	private LocalDateTime firDateTime;
	private String sectionsApplied;
	private Boolean accussedKnown;
	private String accusedName;
	private String severity;
	
	@Enumerated(value = EnumType.STRING)
	private FIRStatus status;
	
	@ManyToOne
	@JoinColumn(name = "station_id")
	private Station station;
	
	@ManyToOne
	@JoinColumn(name = "filed_By")
	private User filedBy;
	
	@ManyToOne
	@JoinColumn(name = "investigating_officer_id")
	private User investigatingOfficer;
	
	
	
	
}
