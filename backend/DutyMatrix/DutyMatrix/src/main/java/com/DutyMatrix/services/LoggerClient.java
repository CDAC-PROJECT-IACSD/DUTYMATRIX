package com.DutyMatrix.services;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class LoggerClient {

    private final RestTemplate restTemplate = new RestTemplate();

    @Value("${LOGGER_URL:http://localhost:5237/api/logger/log}")
    private String loggerUrl;

    public void logAction(String actionType, String description, Long userId) {
        try {
            String url = loggerUrl;

            Map<String, Object> body = new HashMap<>();
            body.put("hactionType", actionType);
            body.put("hactionDescription", description);
            body.put("userId", userId);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            HttpEntity<Map<String, Object>> request =
                    new HttpEntity<>(body, headers);

            restTemplate.postForEntity(url, request, Void.class);

        } catch (Exception e) {
            System.out.println("Logger unavailable: " + actionType);
        }
    }
}
