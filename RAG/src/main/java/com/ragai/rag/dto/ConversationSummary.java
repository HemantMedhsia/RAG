package com.ragai.rag.dto;

import lombok.Data;

import java.util.List;

@Data
public class ConversationSummary {
    private Long id;
    private String title;
    private String mode;
    private List<String> docs;
}
