package com.ragai.rag.repository;

import com.ragai.rag.entity.Document;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DocumentRepository extends JpaRepository<Document, Long> {
    long count();
}