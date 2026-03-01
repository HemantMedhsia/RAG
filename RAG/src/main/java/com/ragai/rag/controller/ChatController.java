package com.ragai.rag.controller;

import com.ragai.rag.dto.ApiResponse;
import com.ragai.rag.dto.ChatRequest;
import com.ragai.rag.dto.ChatResponse;
import com.ragai.rag.entity.Conversation;
import com.ragai.rag.entity.ResponseStructure;
import com.ragai.rag.repository.ChatMessageRepository;
import com.ragai.rag.service.ConversationService;
import com.ragai.rag.service.RagService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/chat")
public class ChatController {

    private final RagService ragService;
    private final ChatMessageRepository chatMessageRepository;
    private final ConversationService conversationService;

    @PostMapping
    public ResponseEntity<ResponseStructure<ChatResponse>> chat(@RequestBody ChatRequest request) {
        ChatResponse chatResponse =  ragService.chat(request);
        return ApiResponse.success(chatResponse, "", HttpStatus.OK);
    }

    @GetMapping("/history/{conversationId}")
    public ResponseEntity<?> history(@PathVariable Long conversationId) {
        return ResponseEntity.ok(
                chatMessageRepository
                        .findByConversationIdOrderByCreatedAtAsc(conversationId)
        );
    }

    @GetMapping("/conversations")
    public List<Conversation> conversations() {
        return conversationService.getAllConversations();
    }
}

