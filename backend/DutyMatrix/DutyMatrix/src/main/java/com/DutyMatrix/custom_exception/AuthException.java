package com.DutyMatrix.custom_exception;

public class AuthException extends RuntimeException {
    public AuthException(String message) {
        super(message);
    }
}
