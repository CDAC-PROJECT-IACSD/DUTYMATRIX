package com.DutyMatrix.notification;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class NotificationRequest {
    private Long userId;
    private String message;
}
