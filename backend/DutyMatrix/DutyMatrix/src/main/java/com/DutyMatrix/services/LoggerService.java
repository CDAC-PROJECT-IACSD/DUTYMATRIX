package com.DutyMatrix.services;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.DutyMatrix.pojo.*;
import com.DutyMatrix.repositories.HistoryRepository;
import com.DutyMatrix.repositories.UserRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class LoggerService {

    private final HistoryRepository historyRepository;
    private final UserRepository userRepository;

    public void logAction(ActionType actionType, String description, Long userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        History history = new History();
        history.setHactionType(actionType);
        history.setHactionDescription(description);
        history.setHtimeStamp(LocalDateTime.now());
        history.setUid(user);

        historyRepository.save(history);
    }

    public List<History> getHistoryByUser(Long userId) {
        return historyRepository.findByUid_Uid(userId);
    }
}
