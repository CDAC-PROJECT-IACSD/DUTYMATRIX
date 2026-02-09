package com.DutyMatrix.notification;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class NotificationClient {

    private final RestTemplate restTemplate;

    // Node.js notification service URL
    @Value("${NOTIFICATION_SERVICE_URL:http://localhost:4000/api/notifications/send}")
    private String notificationUrl;

    public void send(Long userId, String message) {

        try {
            NotificationRequest request =
                    new NotificationRequest(userId, message);

            restTemplate.postForObject(
                    notificationUrl,
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
