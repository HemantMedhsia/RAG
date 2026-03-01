package com.ragai.rag.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "queryLog")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class QueryLog {
    @Id
    @GeneratedValue
    private Long id;

    private String question;

    private Long responseTimeMs;

    private LocalDateTime createdAt;
}
