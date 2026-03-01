package com.ragai.rag.entity;

import com.ragai.rag.constants.ActivityType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "activityLog")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ActivityLog {
    @Id
    @GeneratedValue
    private Long id;

    private String message;

    @Enumerated(EnumType.STRING)
    private ActivityType type;

    private LocalDateTime createdAt;
}
