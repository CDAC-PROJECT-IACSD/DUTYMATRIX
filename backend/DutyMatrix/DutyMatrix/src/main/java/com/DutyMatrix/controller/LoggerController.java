package com.DutyMatrix.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.DutyMatrix.dto.LogRequestDTO;
import com.DutyMatrix.pojo.History;
import com.DutyMatrix.services.LoggerService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/logger")
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class LoggerController {

    private final LoggerService loggerService;

    @PostMapping("/log")
    public void logAction(@RequestBody LogRequestDTO dto) {
        loggerService.logAction(
            dto.getHactionType(),
            dto.getHactionDescription(),
            dto.getUserId()
        );
    }

    @GetMapping("/user/{userId}")
    public List<History> getUserHistory(@PathVariable Long userId) {
        return loggerService.getHistoryByUser(userId);
    }
}
