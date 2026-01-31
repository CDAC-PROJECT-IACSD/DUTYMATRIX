package com.DutyMatrix.pojo;

import java.time.LocalDate;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "leave_request")
@NoArgsConstructor
@Getter
@Setter
@ToString
public class LeaveRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "leave_request_id")
    private Long lid;

    @Column(name = "leave_request_start_date", nullable = false)
    private LocalDate lStartDate;

    @Column(name = "leave_request_end_date", nullable = false)
    private LocalDate lEndDate;

    @Column(name = "leave_request_reason", nullable = false)
    private String lReason;

    @Enumerated(EnumType.STRING)
    @Column(name = "l_status", nullable = false)
    private RequestStatus lStatus;

    @ManyToOne
    @JoinColumn(name = "approved_by")
    private User lapprovedBy;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User uid;
}
