package com.ragai.rag.service;

import com.ragai.rag.entity.Chunk;
import lombok.RequiredArgsConstructor;

import org.springframework.cache.annotation.Cacheable;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class VectorSearchService {

    private final EmbeddingService embeddingService;
    private final JdbcTemplate jdbcTemplate;

    @Cacheable(
    	    value = "vector_search",
    	    key = "T(java.util.Objects).hash(#question, #scope, #documentIds)",
    	    unless = "#result == null || #result.isEmpty()"
    	)
    public List<Chunk> search(String question, String scope, List<Long> documentIds) {
    	
    	System.out.println("VECTOR SEARCH EXECUTED (DB / Embedding hit)");

        List<Double> queryEmbedding = embeddingService.generateEmbedding(question);

        float[] queryEmbeddingFloat = new float[queryEmbedding.size()];
        for (int i = 0; i < queryEmbedding.size(); i++) {
            queryEmbeddingFloat[i] = queryEmbedding.get(i).floatValue();
        }

        String baseSql = """
                SELECT id, document_id, content, embedding
                FROM chunks
                """;

        String whereClause = "";
        Object[] params;

        if ("DOCUMENT".equalsIgnoreCase(scope) && documentIds != null && !documentIds.isEmpty()) {
            whereClause = " WHERE document_id = ? ";
            params = new Object[]{documentIds.get(0), queryEmbeddingFloat};

        } else if ("MULTI_DOCUMENT".equalsIgnoreCase(scope) && documentIds != null && !documentIds.isEmpty()) {
            String inClause = documentIds.stream()
                    .map(id -> "?")
                    .reduce((a, b) -> a + "," + b)
                    .orElse("");

            whereClause = " WHERE document_id IN (" + inClause + ") ";
            params = new Object[documentIds.size() + 1];

            for (int i = 0; i < documentIds.size(); i++) {
                params[i] = documentIds.get(i);
            }
            params[documentIds.size()] = queryEmbeddingFloat;

        } else {
            // GLOBAL
            params = new Object[]{queryEmbeddingFloat};
        }

        String finalSql = baseSql
                + whereClause
                + " ORDER BY embedding <-> ?::vector LIMIT 5";

        return jdbcTemplate.query(finalSql, params, (rs, rowNum) -> {
            Chunk chunk = new Chunk();
            chunk.setId(rs.getLong("id"));
            chunk.setDocumentId(rs.getLong("document_id"));
            chunk.setContent(rs.getString("content"));
            return chunk;
        });
    }
}
