package com.DutyMatrix.notification;

import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import lombok.AllArgsConstructor;

@Component
@AllArgsConstructor
public class NotificationClient {

    private final RestTemplate restTemplate;

    // Node.js notification service URL
    private static final String NOTIFICATION_URL =
            "http://localhost:4000/api/notifications/send";

    public void send(Long userId, String message) {

        try {
            NotificationRequest request =
                    new NotificationRequest(userId, message);

            restTemplate.postForObject(
                    NOTIFICATION_URL,
                    request,
                    String.class
            );

        } catch (Exception e) {
            // VERY IMPORTANT: never break business logic
            System.err.println(
                "Notification service failed: " + e.getMessage()
            );
        }
    }
}
