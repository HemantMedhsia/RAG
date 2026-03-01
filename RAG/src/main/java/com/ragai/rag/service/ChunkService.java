package com.ragai.rag.service;

import com.ragai.rag.entity.Chunk;
import com.ragai.rag.repository.ChunkRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ChunkService {

    private final ChunkRepository chunkRepository;
    private final EmbeddingService embeddingService;

    private static final int CHUNK_SIZE = 500;
    private static final int OVERLAP = 80;
    private static final int MIN_WORDS = 30;

    public void createChunks(Long documentId, String text) {

        if (text == null || text.isBlank()) {
            return;
        }

        String[] words = text.split("\\s+");
        int start = 0;

        while (start < words.length) {

            int end = Math.min(start + CHUNK_SIZE, words.length);

            if (end - start < MIN_WORDS) {
                break;
            }

            String chunkText = String.join(" ",
                    Arrays.copyOfRange(words, start, end)).trim();

            try {
                List<Double> vector =
                        embeddingService.generateEmbedding(chunkText);

                float[] embedding = new float[vector.size()];
                for (int i = 0; i < vector.size(); i++) {
                    embedding[i] = vector.get(i).floatValue();
                }

                Chunk chunk = new Chunk();
                chunk.setDocumentId(documentId);
                chunk.setContent(chunkText);
                chunk.setEmbedding(embedding);

                chunkRepository.save(chunk);

            } catch (Exception e) {
                System.err.println("Embedding failed for document " + documentId);
            }

            start += (CHUNK_SIZE - OVERLAP);
        }
    }
}



