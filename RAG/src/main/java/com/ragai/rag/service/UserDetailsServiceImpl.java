package com.ragai.rag.service;

import com.ragai.rag.entity.User;
import com.ragai.rag.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


import java.util.List;

@Service
@AllArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {
    private final UserRepository userRepo;
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
    	User userModel = userRepo.findByEmail(email.toLowerCase())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        List<GrantedAuthority> gAuth = List.of(new SimpleGrantedAuthority("ROLE_" + userModel.getRole()));
        return new org.springframework.security.core.userdetails.User(
                userModel.getEmail(),
                userModel.getPassword(),
                gAuth
        );

    }
}
