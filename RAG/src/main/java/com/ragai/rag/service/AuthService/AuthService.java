package com.ragai.rag.service.AuthService;

import java.util.Map;

import com.ragai.rag.dto.AuthRequest;
import com.ragai.rag.dto.RegisterRequest;
import com.ragai.rag.dto.UserResponseDto;
import com.ragai.rag.entity.ResponseStructure;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;


public interface AuthService {
    ResponseEntity<ResponseStructure<UserResponseDto>> saveUser(RegisterRequest user);
    ResponseEntity<ResponseStructure<UserResponseDto>> loginUser(AuthRequest req);
    ResponseEntity<ResponseStructure<Object>> refreshAccessToken(String refreshToken);
    ResponseEntity<Map<String, String>> logoutUser(String refreshToken);
    UserResponseDto getCurrentUser(Authentication authentication);
}

