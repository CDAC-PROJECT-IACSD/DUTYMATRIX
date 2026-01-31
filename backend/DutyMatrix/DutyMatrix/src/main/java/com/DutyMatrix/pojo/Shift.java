package com.DutyMatrix.pojo;

import java.time.LocalDate;
import java.time.LocalTime;

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

@Entity
@Table(name = "shifts")
@NoArgsConstructor
@Getter
@Setter
public class Shift {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "shift_id")
    private Long shid;

    @Enumerated(EnumType.STRING)
    @Column(name = "shift_type")
    private ShiftType shtype;

    @Column(name = "shift_date")
    private LocalDate shDate;

    @Column(name = "shift_start_time")
    private LocalTime shStartTime;

    @Column(name = "shift_end_time")
    private LocalTime shEndTime;

    @ManyToOne
    @JoinColumn(name = "station_id", nullable = false)
    private Station station;

    @ManyToOne
    @JoinColumn(name = "assigned_user_id")
    private User assignedUser;
}
