package com.DutyMatrix.services;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.DutyMatrix.dto.LoginRequestDTO;
import com.DutyMatrix.dto.LoginResponseDTO;
import com.DutyMatrix.pojo.User;
import com.DutyMatrix.repositories.UserRepository;
import com.DutyMatrix.security.JwtUtils;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;

    @Override
    public LoginResponseDTO login(LoginRequestDTO request) {

        User user = userRepository.findByUemail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));

        if (!passwordEncoder.matches(request.getPassword(), user.getUpassword())) {
            throw new RuntimeException("Invalid email or password");
        }

        String token = jwtUtils.generateToken(
                user.getUid(),
                user.getUemail(),
                user.getUrole().name(),
                user.getStation().getSid()
        );

        return new LoginResponseDTO(
                user.getUid(),
                user.getUname(),
                user.getUemail(),
                user.getUrole(),
                user.getStation().getSid(),
                token
        );
    }

    // ✅ RESET PASSWORD (WORKING)
    @Override
    public void resetPassword(String token, String newPassword) {

        String email = jwtUtils.extractUsername(token); // 👈 FIXED

        User user = userRepository.findByUemail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setUpassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
    }
}
