package com.ragai.rag.service;

import com.ragai.rag.dto.ChatRequest;
import com.ragai.rag.dto.ChatResponse;
import com.ragai.rag.entity.ChatMessage;
import com.ragai.rag.entity.Chunk;
import com.ragai.rag.entity.Conversation;
import com.ragai.rag.entity.QueryLog;
import com.ragai.rag.repository.ChatMessageRepository;
import com.ragai.rag.repository.QueryLogRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RagService {

    private final VectorSearchService searchService;
    private final LlmService llmService;
    private final QueryLogRepository queryLogRepository;
    private final ConversationService conversationService;
    private final ChatMessageRepository chatMessageRepository;

    public ChatResponse chat(ChatRequest request) {

        long startTime = System.currentTimeMillis();
        Conversation conversation;

        if (request.getConversationId() == null) conversation = conversationService.createNewConversation(request.getQuestion(), request.getScope());
        else conversation = conversationService.getConversation(request.getConversationId());

        ChatMessage userMsg = new ChatMessage();

        userMsg.setConversation(conversation);
        userMsg.setRole(ChatMessage.Role.USER);
        userMsg.setContent(request.getQuestion());
        userMsg.setCreatedAt(LocalDateTime.now());

        chatMessageRepository.save(userMsg);

        List<Chunk> chunks = searchService.search(
                request.getQuestion(),
                request.getScope(),
                request.getDocumentIds()
        );

        String context = chunks.stream()
                .map(Chunk::getContent)
                .reduce("", (a, b) -> a + "\n\n" + b);

        String prompt = """
            You are a backend engineering assistant working in a Retrieval-Augmented Generation (RAG) system.
            Your task is to respond appropriately to the user's input.

            ### General Behavior
            - If the user greets you (e.g., "hi", "hello", "hey", "good morning"),
              respond politely with a short greeting.
            - For greetings, you do NOT need to use the Context.
            - Keep greeting responses short and friendly.

            ### Question Answering (RAG Mode)
            - When the user asks a question, answer using ONLY the information provided in the Context.
            - You MAY summarize, reorganize, or list information found in the Context.
            - You MAY infer simple structure (lists, headings) if the data is clearly present.
            - Do NOT add facts that are not present in the Context.
            - Do NOT use external knowledge.

            ### When to say "Not available"
            - ONLY if the Context contains NO information related to the question at all.
            - If partial information is available, answer using only that partial information.

            ### Formatting Rules
            - Respond strictly in valid Markdown.
            - Use headings where appropriate.
            - Use bullet points or numbered lists when listing items.
            - Each list item must be on its own line.
            - Do NOT inline multiple items in a single sentence.
            - Do NOT wrap the answer in ```markdown``` or code blocks.

            ### Context
            %s

            ### User Input
            %s

            ### Answer
        """.formatted(context, request.getQuestion());

        String answer = llmService.ask(prompt);
        long responseTimeMs = System.currentTimeMillis() - startTime;

        QueryLog log = new QueryLog();
        log.setQuestion(request.getQuestion());
        log.setResponseTimeMs(responseTimeMs);
        log.setCreatedAt(LocalDateTime.now());

        queryLogRepository.save(log);

        ChatMessage aiMsg = new ChatMessage();

        aiMsg.setConversation(conversation);
        aiMsg.setRole(ChatMessage.Role.ASSISTANT);
        aiMsg.setContent(answer);
        aiMsg.setResponseTimeMs(responseTimeMs);
        aiMsg.setCreatedAt(LocalDateTime.now());

        chatMessageRepository.save(aiMsg);

        return new ChatResponse(conversation.getId(), answer);
    }
}