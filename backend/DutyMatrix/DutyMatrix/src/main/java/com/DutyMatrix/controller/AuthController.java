package com.DutyMatrix.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.DutyMatrix.dto.LoginRequestDTO;
import com.DutyMatrix.dto.LoginResponseDTO;
import com.DutyMatrix.services.AuthService;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(
            @RequestBody LoginRequestDTO dto) {

        LoginResponseDTO res = authService.login(dto);
        return ResponseEntity.ok(res);
    }

}
