package com.DutyMatrix.custom_exception;

import com.DutyMatrix.dto.ApiResponse;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

	// Validation Handler
	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<?> handleValidation(MethodArgumentNotValidException e){
		List<FieldError> fieldError = e.getFieldErrors();
		Map<String,String> collect = fieldError.stream().collect(Collectors.toMap(FieldError::getField, FieldError::getDefaultMessage));
		
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(collect);
	}
	
	@ExceptionHandler(ResourceNotFoundException.class)
	public ResponseEntity<?> handleResourseNotFoundException(ResourceNotFoundException e){
		return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body(new ApiResponse(e.getMessage(), "Resourse not found"));
	}
	
	@ExceptionHandler(ResourceAlreadyExist.class)
	public ResponseEntity<?> handleResourseException(ResourceAlreadyExist e){
		return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body(new ApiResponse(e.getMessage(),"Invalid Resourse"));
	}
	
	@ExceptionHandler(Exception.class)
	public ResponseEntity<?> handleException(Exception e){
		e.printStackTrace(); // ✅ PRINTS ERROR TO RENDER LOGS
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse(e.getMessage(),"Error Occured"));
	}
	
}
