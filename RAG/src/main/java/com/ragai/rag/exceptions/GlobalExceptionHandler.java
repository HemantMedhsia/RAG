package com.ragai.rag.exceptions;


import com.ragai.rag.dto.ApiResponse;
import com.ragai.rag.entity.ErrorStructure;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorStructure> handleValidation(MethodArgumentNotValidException ex) {

        Map<String, String> errors = new HashMap<>();

        ex.getBindingResult()
                .getFieldErrors()
                .forEach(error ->
                        errors.put(error.getField(), error.getDefaultMessage())
                );

        return ApiResponse.error(
                errors.toString(),
                "Validation Failed",
                HttpStatus.BAD_REQUEST
        );
    }

    @ExceptionHandler({BadCredentialsException.class, UsernameNotFoundException.class})
    public ResponseEntity<ErrorStructure> handleAuth(RuntimeException ex) {
        return ApiResponse.error(
                ex.getMessage(),
                "Not Authenticated",
                HttpStatus.UNAUTHORIZED
        );
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<ErrorStructure> handleDup(DataIntegrityViolationException ex) {
        return ApiResponse.error(
                ex.getMostSpecificCause().getMessage(),
                "Duplicate or conflicting data",
                HttpStatus.CONFLICT
        );
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorStructure> handleGeneric(Exception ex) {
        return ApiResponse.error(
                ex.getMessage(),
                "Internal error",
                HttpStatus.INTERNAL_SERVER_ERROR
        );
    }
}
