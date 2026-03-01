package com.ragai.rag.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ResponseStructure<T> {
    private String status;
    private String message;
    private T data;
    private Long tokenExpTime;
    private LocalDateTime timestamp;
}
