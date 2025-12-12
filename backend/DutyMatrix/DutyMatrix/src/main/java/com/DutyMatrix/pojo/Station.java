package com.DutyMatrix.pojo;

import java.util.List;

import jakarta.annotation.Generated;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "stations")

@Getter
@Setter
@NoArgsConstructor
@ToString
public class Station {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "station_id")
	private int sid;
	
	@Column(name = "station_name")
	private String sname;
	
	@Column(name = "station_contact")
	private String scontact;
	
	@Column(name = "station_location")
	private String sloc;
	
	//Foreign Key
	@OneToMany(mappedBy = "station", cascade = CascadeType.ALL)
	private List<Shift> shifts;
	
	
	
}
