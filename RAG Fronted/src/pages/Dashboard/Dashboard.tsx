import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { DashboardData } from "./types/types";
import DashboardHeader from "./components/DashboardHeader";
import StatCards from "./components/StatCards";
import SystemStatus from "./components/SystemStatus";
import RecentActivity from "./components/RecentActivity";
import OutletLoader from "../../components/ui/OutletLoader";
import ErrorPagePlaceholder from "../../components/ui/ErrorPagePlaceholder";
import { fetchDashboard } from "./services/dashboardApi";

export default function Dashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadDashboard = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetchDashboard();
      setData(res);
    } catch(err: any) {
      setError(err.response?.data?.message || "Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  if (loading) {
    return <OutletLoader
      title="Preparing your dashboard"
      description="Gathering insights, stats, and recent activity…"
    />
  }

  if (error || !data) {
    return <ErrorPagePlaceholder
      title="Unable to Load Dashboard"
      errorMessage={error || "We couldn’t load your dashboard data right now. Try refreshing or come back in a moment."}
      icon="😕"
    />
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="space-y-6"
    >
      <DashboardHeader loadDashboard={loadDashboard} loading={loading} />
      <StatCards data={data} />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <SystemStatus data={data} />
        <RecentActivity data={data} />
      </div>
    </motion.div>
  );
}