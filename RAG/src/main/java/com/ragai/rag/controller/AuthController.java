package com.ragai.rag.controller;


import com.ragai.rag.dto.AuthRequest;
import com.ragai.rag.dto.RegisterRequest;
import com.ragai.rag.dto.UserResponseDto;
import com.ragai.rag.entity.ResponseStructure;
import com.ragai.rag.service.AuthService.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<ResponseStructure<UserResponseDto>> registerUser(@RequestBody RegisterRequest user) {
        return authService.saveUser(user);
    }

    @PostMapping("/login")
    public ResponseEntity<ResponseStructure<UserResponseDto>> login(@Valid @RequestBody AuthRequest req) {
        return authService.loginUser(req);
    }

    @PostMapping("/refresh")
    public ResponseEntity<ResponseStructure<Object>> refresh(
            @CookieValue(name = "refresh_token", required = false) String refreshToken) {
    	System.out.println("refresh called...... ------------>");
        return authService.refreshAccessToken(refreshToken);
    }

    @PostMapping("/logout")
    public ResponseEntity<Map<String, String>> logout(@CookieValue(name = "refresh_token", required = false) String refreshToken) {
        return authService.logoutUser(refreshToken);
    }

    @GetMapping("/me")
    public ResponseEntity<UserResponseDto> me(Authentication authentication) {
        if (authentication == null) {
            return ResponseEntity.status(401).build();
        }
        return ResponseEntity.ok(authService.getCurrentUser(authentication));
    }

}
