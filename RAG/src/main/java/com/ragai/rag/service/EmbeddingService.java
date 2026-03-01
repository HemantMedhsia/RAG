package com.ragai.rag.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
//import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;
import java.util.Map;

@Service
public class EmbeddingService {

    @Value("${openrouter.api.key}")
    private String apiKey;

    private final RestClient restClient = RestClient.builder()
            .baseUrl("https://openrouter.ai/api/v1")
            .build();

    public List<Double> generateEmbedding(String text) {

        System.out.println("=================================>: " + text);
        Map<String, Object> body = Map.of(
                "model", "text-embedding-3-small",
                "input", text
        );

        Map response = restClient.post()
                .uri("/embeddings")
                .header("Authorization", "Bearer " + apiKey)
                .body(body)
                .retrieve()
                .body(Map.class);

        List<Map> data = (List<Map>) response.get("data");
        return (List<Double>) data.get(0).get("embedding");
    }
}

