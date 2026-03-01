package com.ragai.rag.service.AuthService;


import com.ragai.rag.config.security.JwtService;
import com.ragai.rag.dto.ApiResponse;
import com.ragai.rag.dto.AuthRequest;
import com.ragai.rag.dto.RegisterRequest;
import com.ragai.rag.dto.UserResponseDto;
import com.ragai.rag.entity.ResponseStructure;
import com.ragai.rag.entity.User;
import com.ragai.rag.repository.UserRepository;
import com.ragai.rag.utils.PasswordEncoder;
import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;

import java.time.Duration;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService{
    private final UserRepository userRepo;
    private final UserDetailsService userDetailsService;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    
    @Value("${security.jwt.access-exp-minutes:3}")
    private long accessExpMinutes;
    
    @Value("${security.jwt.refresh-exp-minutes:15}")
    private long refreshExpMinutes;

    @Override
    @Transactional
    public ResponseEntity<ResponseStructure<UserResponseDto>> saveUser(RegisterRequest registerRequest) {

        String email = registerRequest.email().trim().toLowerCase();

        
        if (userRepo.findByEmail(email).isPresent()) {
            throw new DataIntegrityViolationException("User with email (" + email + ") already exists");
        }


        // Create new user with all details
        User newUser = User.builder()
                .name(registerRequest.name().trim())
                .email(registerRequest.email())
                .password(PasswordEncoder.passwordEncoder().encode(registerRequest.password()))
                .role(registerRequest.role())
                .build();

        User savedUser = userRepo.saveAndFlush(newUser);
        UserDetails userDetails = userDetailsService.loadUserByUsername(email);
        String accessToken = jwtService.generateAccessToken(userDetails);
        String refreshToken = jwtService.generateRefreshToken(userDetails);

        savedUser.setRefreshToken(refreshToken);
        savedUser.setRefreshTokenExpiry(Instant.now().plus(refreshExpMinutes, ChronoUnit.MINUTES));
        long expiresInSeconds = Duration.ofMinutes(refreshExpMinutes).toSeconds();
        userRepo.save(savedUser);

        ResponseCookie accessCookie = ResponseCookie.from("access_token", accessToken)
                .httpOnly(true)
                .secure(true)
                .sameSite("None")
                .path("/")
                .maxAge(Duration.ofMinutes(accessExpMinutes))
                .build();

        ResponseCookie refreshCookie = ResponseCookie.from("refresh_token", refreshToken)
                .httpOnly(true)
                .secure(true)
                .sameSite("None")
                .path("/")
                .maxAge(Duration.ofMinutes(refreshExpMinutes))
                .build();

        return ApiResponse.successWithCookie(
                new UserResponseDto(savedUser.getId(), savedUser.getName(), savedUser.getEmail(), savedUser.getRole()),
                "User registered successfully",
                HttpStatus.CREATED,
                expiresInSeconds,
                accessCookie,
                refreshCookie
        );
    }


	@Override
	public ResponseEntity<ResponseStructure<UserResponseDto>> loginUser(AuthRequest req) {
		
		try {
			authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(req.email().toLowerCase(), req.password()));
        } catch (BadCredentialsException e) {
            System.out.println(e.getMessage());
            throw e;
        }

        User fetchUser = userRepo.findByEmail(req.email()
        		.toLowerCase())
        		.orElseThrow(() -> 
        			new UsernameNotFoundException(
                        "Unable to fetch user with email(" + req.email() + ")"
                ));

        UserDetails user = userDetailsService.loadUserByUsername(req.email().toLowerCase());
        String access = jwtService.generateAccessToken(user);
        String refresh = jwtService.generateRefreshToken(user);
        
        fetchUser.setRefreshToken(refresh);
        fetchUser.setRefreshTokenExpiry(Instant.now().plus(refreshExpMinutes, ChronoUnit.MINUTES));
        long expiresInSeconds = Duration.ofMinutes(refreshExpMinutes).toSeconds();
        userRepo.save(fetchUser);

        ResponseCookie accessCookie = ResponseCookie.from("access_token", access)
                .httpOnly(true)
                .secure(true)	
                .sameSite("None")
                .path("/")
                .maxAge(Duration.ofMinutes(accessExpMinutes))
                .build();

        ResponseCookie refreshCookie = ResponseCookie.from("refresh_token", refresh)
                .httpOnly(true)
                .secure(true)
                .sameSite("None")
                .path("/")
                .maxAge(Duration.ofMinutes(refreshExpMinutes))
                .build();

        return ApiResponse.successWithCookie(
        		new UserResponseDto(
        				fetchUser.getId(), 
        				fetchUser.getName(),
        				fetchUser.getEmail(), 
        				fetchUser.getRole()
        		),
                "User login successfully",
                HttpStatus.OK,
                expiresInSeconds,
                accessCookie,
                refreshCookie
        );
	}
	

	@Override
    public ResponseEntity<ResponseStructure<Object>> refreshAccessToken(String refreshToken) {

        if (refreshToken == null) {
            throw new BadCredentialsException("Missing refresh token cookie");
        }

        Claims claims;
        try {
            claims = jwtService.parseClaims(refreshToken);
        } catch (Exception e) {
            throw new BadCredentialsException("Invalid refresh token");
        }

        if (!"refresh".equals(claims.get("type"))) {
            throw new BadCredentialsException("Only refresh tokens are allowed");
        }

        String username = claims.getSubject();
        System.out.print(username);
        
        User fetchedUser = userRepo.findByEmail(username)
        		.orElseThrow(()-> new BadCredentialsException("User not found"));
        
        if (!refreshToken.equals(fetchedUser.getRefreshToken())) {
            throw new BadCredentialsException("Refresh token mismatch");
        }

        if (fetchedUser.getRefreshTokenExpiry().isBefore(Instant.now())) {
            throw new BadCredentialsException("Session expired due to inactivity");
        }
        
        UserDetails user = userDetailsService.loadUserByUsername(username);
        
        if(user == null) {
        	throw new BadCredentialsException("User not found in the token");
        }

        if (!jwtService.isTokenValid(refreshToken, user)) {
            throw new BadCredentialsException("Invalid or expired refresh token");
        }

        String newAccessToken = jwtService.generateAccessToken(user);
//        String newRefreshToken = jwtService.generateRefreshToken(user);
        
//        fetchedUser.setRefreshToken(newRefreshToken);
//        fetchedUser.setRefreshTokenExpiry(Instant.now().plus(refreshExpMinutes, ChronoUnit.MINUTES));
        long expiresInSeconds = Duration.ofMinutes(refreshExpMinutes).toSeconds();
        userRepo.save(fetchedUser);


        ResponseCookie newAccessCookie = ResponseCookie.from("access_token", newAccessToken)
                .httpOnly(true)
                .secure(true)
                .sameSite("None")
                .path("/")
                .maxAge(Duration.ofMinutes(accessExpMinutes))
                .build();
        
//        ResponseCookie newRefreshCookie = ResponseCookie.from("refresh_token", newRefreshToken)
//                .httpOnly(true)
//                .secure(true)
//                .sameSite("None")
//                .path("/")
//                .maxAge(Duration.ofMinutes(refreshExpMinutes))
//                .build();

        return ApiResponse.successWithCookie(
                null,
                "Access and Refresh token generated successfully",
                HttpStatus.CREATED,
                expiresInSeconds,
                newAccessCookie
        );
    }

//    @Override
//    public ResponseEntity<Map<String, String>> logoutUser(@CookieValue(name = "refresh_token", required = false) String refreshToken) {
//    	
//    	Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//    	
//    	if (authentication == null || !authentication.isAuthenticated()) {
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
//                    .body(Map.of("message", "No authenticated user found"));
//        }
//
//        String email = authentication.getName();
//        System.out.println("---> " + email);
//        System.out.println("---> " + userRepo.findByEmail(email));
//
//        userRepo.findByEmail(email).ifPresent(user -> {
//            user.setRefreshToken(null);
//            user.setRefreshTokenExpiry(null);
//            userRepo.save(user);
//        });
//
//    	
//        ResponseCookie clearAccessCookie = ResponseCookie.from("access_token", "")
//                .httpOnly(true)
//                .secure(true)
//                .sameSite("None")
//                .path("/")
//                .maxAge(0)
//                .build();
//
//        ResponseCookie clearRefreshCookie = ResponseCookie.from("refresh_token", "")
//                .httpOnly(true)
//                .secure(true)
//                .sameSite("None")
//                .path("/")
//                .maxAge(0)
//                .build();
//
//        return ResponseEntity.ok()
//                .header(
//                		HttpHeaders.SET_COOKIE, 
//                		clearAccessCookie.toString(), 
//                		clearRefreshCookie.toString())
//                .body(
//                		Map.of(
//                				"message", 
//                				"Logout successful"
//                				)
//                		);
//    } 
	
	@Override
	public ResponseEntity<Map<String, String>> logoutUser(String refreshToken) {

		if (refreshToken == null) {
		    return ResponseEntity.ok(
		            Map.of("message", "Already logged out, please login again")
		    );
		}

	    userRepo.findByRefreshToken(refreshToken).ifPresent(user -> {
	        user.setRefreshToken(null);
	        user.setRefreshTokenExpiry(null);
	        userRepo.save(user);
	    });

	    ResponseCookie clearAccessCookie = ResponseCookie.from("access_token", "")
	            .httpOnly(true)
	            .secure(true)
	            .sameSite("None")
	            .path("/")
	            .maxAge(0)
	            .build();

	    ResponseCookie clearRefreshCookie = ResponseCookie.from("refresh_token", "")
	            .httpOnly(true)
	            .secure(true)
	            .sameSite("None")
	            .path("/")
	            .maxAge(0)
	            .build();

	    return ResponseEntity.ok()
	            .header(HttpHeaders.SET_COOKIE, clearAccessCookie.toString())
	            .header(HttpHeaders.SET_COOKIE, clearRefreshCookie.toString())
	            .body(Map.of("message", "Logout successful"));
	}

    @Override
    public UserResponseDto getCurrentUser(Authentication authentication) {

        if (authentication == null ||
                !authentication.isAuthenticated() ||
                authentication instanceof AnonymousAuthenticationToken) {
            throw new BadCredentialsException("User not authenticated");
        }

        String email = authentication.getName(); // comes from JWT subject

        User user = userRepo.findByEmail(email)
                .orElseThrow(() ->
                        new UsernameNotFoundException(
                                "User not found with email: " + email
                        )
                );

        return new UserResponseDto(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRole()
        );
    }

}
