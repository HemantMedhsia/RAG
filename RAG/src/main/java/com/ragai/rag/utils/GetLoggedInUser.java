package com.ragai.rag.utils;

import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

public class GetLoggedInUser {
	
	public static String getUser() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

		if (authentication == null || !authentication.isAuthenticated())
			throw new BadCredentialsException("User not authenticated");

		return authentication.getName();
	}
}