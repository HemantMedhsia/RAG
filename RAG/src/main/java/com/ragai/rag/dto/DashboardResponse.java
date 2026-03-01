package com.ragai.rag.dto;

import lombok.Builder;
import lombok.Data;
import java.util.List;

@Data
@Builder
public class DashboardResponse {

    private Stats stats;
    private SystemStatus systemStatus;
    private List<String> recentActivity;
}