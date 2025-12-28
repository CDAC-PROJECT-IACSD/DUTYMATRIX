package com.DutyMatrix.pojo;

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
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;


@Entity
@Table(name = "swap_requests")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class SwapRequest {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "swap_id")
	private Long swapId;
	
	@Column(name = "reason")
	private String reason;
	
	@Enumerated(EnumType.STRING)
	@Column(name = "status")
	private RequestStatus status;
	
	@ManyToOne
	@JoinColumn(name = "requesting_user_id")
	private User requestingUser;
	
	@ManyToOne
	@JoinColumn(name = "target_user_id")
	private User targetUser;
	
	@ManyToOne
	@JoinColumn(name = "shift_id", nullable = false)
	private Shift shift;
	
	@ManyToOne
	@JoinColumn(name = "approved_by")
	private User approvedBy;
}
