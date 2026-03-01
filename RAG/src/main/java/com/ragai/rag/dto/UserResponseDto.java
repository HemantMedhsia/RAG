package com.ragai.rag.dto;

public record UserResponseDto(
        String id,
        String name,
        String email,
        String role
) {}