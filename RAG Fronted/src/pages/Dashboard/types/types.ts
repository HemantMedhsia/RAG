type DashboardData = {
  stats: {
    documentsIndexed: number;
    totalChunks: number;
    queriesAsked: number;
  };
  systemStatus: {
    vectorDb: string;
    embeddingEngine: string;
    lastIndexingRun: string;
    avgResponseTime: string;
  };
  recentActivity: string[];
};

export type { DashboardData };
