package com.ragai.rag.repository;

import java.util.Optional;

import com.ragai.rag.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, String>{
	Optional<User> findByEmail(String email);
	Optional<User> findByRefreshToken(String refreshToken);
}
