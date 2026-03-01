package com.ragai.rag.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
//import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;
import java.util.Map;

@Service
public class LlmService {

    @Value("${openrouter.api.key}")
    private String apiKey;

//    private final WebClient webClient = WebClient.builder()
//            .baseUrl("https://openrouter.ai/api/v1")
//            .build();

    private final RestClient restClient = RestClient.builder()
            .baseUrl("https://openrouter.ai/api/v1")
            .build();

    @Cacheable(
    	    value = "llm_answer",
    	    key = "T(java.util.Objects).hash(#prompt)",
    	    unless = "#result == null"
    	)
    public String ask(String prompt) {

        Map<String, Object> body = Map.of(
                "model", "gpt-4o-mini",
                "messages", List.of(
                        Map.of("role", "user", "content", prompt)
                ),
                "temperature", 0
        );

        Map response = restClient.post()
                .uri("/chat/completions")
                .header("Authorization", "Bearer " + apiKey)
                .body(body)
                .retrieve()
                .body(Map.class);

        List<Map> choices = (List<Map>) response.get("choices");

        return (String) ((Map) choices.get(0).get("message")).get("content");
    }
}

