package com.ragai.rag.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class SystemStatus {

    private String vectorDb;
    private String embeddingEngine;
    private String lastIndexingRun;
    private String avgResponseTime;
}
