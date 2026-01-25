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

    // Not required as we are using JWT Tokens
//    public AuthServiceImpl(UserRepository userRepository,
//                           PasswordEncoder passwordEncoder) {
//        this.userRepository = userRepository;
//        this.passwordEncoder = passwordEncoder;
//    }

    @Override
    public LoginResponseDTO login(LoginRequestDTO request) {

        User user = userRepository.findByUemail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));
        
        
        if (!passwordEncoder.matches(request.getPassword(), user.getUpassword())) {
            throw new RuntimeException("Invalid email or password");
            
        }
        
        String token = jwtUtils.generateToken(user.getUid(), user.getUemail(), user.getUrole().name(), user.getStation().getSid());

        return new LoginResponseDTO(
        		user.getUid(),
        		user.getUname(),
        		user.getUemail(),
        		user.getUrole(),
        		user.getStation().getSid(),
        		token
        		);
//        LoginResponseDTO response = new LoginResponseDTO();
//
//        response.setUserId(user.getUid());
//        response.setUserName(user.getUname());
//        response.setEmail(user.getUemail());
//        response.setRole(user.getUrole());
//        response.setStationId(user.getStation().getSid());
//
//        return response;

    }
}
