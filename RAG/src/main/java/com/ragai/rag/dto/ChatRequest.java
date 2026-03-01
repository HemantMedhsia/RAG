package com.ragai.rag.dto;

import lombok.Data;
import java.util.List;

@Data
public class ChatRequest {

    private Long conversationId;
    private String question;
    private String scope;
    private List<Long> documentIds;
}
