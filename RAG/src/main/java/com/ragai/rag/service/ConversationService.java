package com.ragai.rag.service;

import com.ragai.rag.entity.Conversation;
import com.ragai.rag.repository.ConversationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ConversationService {

    private final ConversationRepository conversationRepository;

    public Conversation createNewConversation(String question, String scope) {
        Conversation c = new Conversation();
        c.setTitle(question);
        c.setScope(scope);
        c.setCreatedAt(LocalDateTime.now());
        return conversationRepository.save(c);
    }

    public Conversation getConversation(Long id) {
        return conversationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Conversation not found"));
    }

    public List<Conversation> getAllConversations() {
        return conversationRepository.findAll();
    }
}
