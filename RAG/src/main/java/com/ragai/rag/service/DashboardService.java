package com.ragai.rag.service;

import com.ragai.rag.dto.DashboardResponse;
import com.ragai.rag.dto.Stats;
import com.ragai.rag.dto.SystemStatus;
import com.ragai.rag.repository.ActivityLogRepository;
import com.ragai.rag.repository.ChunkRepository;
import com.ragai.rag.repository.DocumentRepository;
import com.ragai.rag.repository.QueryLogRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DashboardService {
    private final DocumentRepository documentRepository;
    private final ChunkRepository chunkRepository;
    private final QueryLogRepository queryLogRepository;
    private final ActivityLogRepository activityLogRepository;

    public DashboardResponse getDashboard() {

        long documentsIndexed = documentRepository.count();
        long totalChunks = chunkRepository.countChunks();
        long queriesAsked = queryLogRepository.count();

        Stats stats = new Stats(
                documentsIndexed,
                totalChunks,
                queriesAsked
        );

        String vectorDbStatus = "Connected";
        String embeddingEngineStatus = "Active";

        String lastIndexingRun = activityLogRepository
                .findLastIndexingTime()
                .map(this::formatTimeAgo)
                .orElse("Never");

        Double avgMs = queryLogRepository.findAverageResponseTime();
        String avgResponseTime = String.format("%.2fs", avgMs / 1000);

        SystemStatus systemStatus = new SystemStatus(
                vectorDbStatus,
                embeddingEngineStatus,
                lastIndexingRun,
                avgResponseTime
        );

        List<String> recentActivity =
                activityLogRepository.findTop5Messages();

        return DashboardResponse.builder()
                .stats(stats)
                .systemStatus(systemStatus)
                .recentActivity(recentActivity)
                .build();
    }

    private String formatTimeAgo(LocalDateTime time) {
        Duration duration = Duration.between(time, LocalDateTime.now());

        long minutes = duration.toMinutes();
        if (minutes < 1) return "Just now";
        if (minutes < 60) return minutes + " minutes ago";

        long hours = duration.toHours();
        if (hours < 24) return hours + " hours ago";

        long days = duration.toDays();
        return days + " days ago";
    }
}
