package com.DutyMatrix.services;

import org.springframework.stereotype.Service;

import com.DutyMatrix.notification.NotificationClient;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class NotificationServices {

    private final NotificationClient notificationClient;

    public void sendNotification(Long userId, String message) {
        notificationClient.send(userId, message);
    }
}
