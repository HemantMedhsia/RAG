package com.ragai.rag.repository;

import com.ragai.rag.entity.Chunk;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ChunkRepository extends JpaRepository<Chunk, Long> {
    @Query(value = """
    SELECT * FROM chunks
    ORDER BY embedding <-> CAST(:embedding AS vector)
    LIMIT 3
    """, nativeQuery = true)
    List<Chunk> findTopSimilar(@Param("embedding") String embedding);

    @Query("select count(c) from Chunk c")
    long countChunks();

}

