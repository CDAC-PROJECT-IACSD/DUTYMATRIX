package com.DutyMatrix.services;

import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.DutyMatrix.custom_exception.ResourceNotFoundException;
import com.DutyMatrix.custom_exception.ResourceAlreadyExist;
import com.DutyMatrix.dto.UserRegisterDTO;
import com.DutyMatrix.pojo.Station;
import com.DutyMatrix.pojo.User;
import com.DutyMatrix.repositories.StationRepository;
import com.DutyMatrix.repositories.UserRepository;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class UserServiceImpl implements UserService {

	private final UserRepository userRepo;
	private final StationRepository stationRepo;
	private final PasswordEncoder passwordEncoder;
	private final ModelMapper mapper;
	@Override
	public String registerUser(UserRegisterDTO userRegisterDTO) {
		if(userRepo.existsByUemail(userRegisterDTO.getUemail())) {
			throw new ResourceAlreadyExist("User already Exist with email : "+userRegisterDTO.getUemail());
		}
		
		Station station = stationRepo.findById(userRegisterDTO.getStation_id()).orElseThrow(()-> new ResourceNotFoundException("station not found"));
		
		User user = mapper.map(userRegisterDTO, User.class);
		user.setUpassword(passwordEncoder.encode(userRegisterDTO.getUpassword()));
		user.setStation(station);
		
		User saved = userRepo.save(user);
		
		return "New user created "+saved.getUemail();
	}

}
