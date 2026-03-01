package com.ragai.rag.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Stats {

    private long documentsIndexed;
    private long totalChunks;
    private long queriesAsked;
}
