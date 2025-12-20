package com.DutyMatrix.pojo;

import java.time.LocalDateTime;

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
@Table(name="History")
@NoArgsConstructor


@Getter
@Setter
@ToString
public class History {

	//hid, uid(fk), actionType, timeStamp, actionDescription
	
	@Column(name="history_id")
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int hid;
	
	@Enumerated(EnumType.STRING)
	private ActionType hactionType;
	
	@Column(name="history_timeStamp")
	private LocalDateTime htimeStamp;
	
	@Column(name="history_actionDescription")
	private String hactionDescription;
	
	// fk
//	@JoinColumn(name="userId", nullable= false)
//	@ManyToOne
	//private User uid;
	
	
	
}
