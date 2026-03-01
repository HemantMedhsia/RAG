import { MessageCircle, RefreshCcw, Upload } from "lucide-react"
import Button from "../../../components/ui/Button"
import { useNavigate } from "react-router-dom";

function DashboardHeader({ loadDashboard, loading }: { loadDashboard: () => void, loading: boolean }) {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
                <h1 className="text-2xl font-semibold text-gray-200">Dashboard</h1>
                <p className="mt-1 text-sm text-gray-400">
                    Overview of your knowledge base & usage
                </p>
            </div>

            {/* QUICK ACTIONS */}
            <div className="flex flex-wrap items-center gap-2">
                <Button
                    size="sm"
                    onClick={loadDashboard}
                    disabled={loading}
                    className="flex items-center gap-2"
                    aria-label="Refresh dashboard"
                >
                    <RefreshCcw size={14} className={loading ? "animate-spin" : ""} />
                    <span className="hidden sm:inline">Refresh</span>
                </Button>

                <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => navigate("/upload")}
                    className="flex items-center gap-2"
                    aria-label="Upload documents"
                >
                    <Upload size={14} />
                    <span className="hidden sm:inline">Upload Docs</span>
                </Button>

                <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => navigate("/chat")}
                    className="flex items-center gap-2"
                    aria-label="Ask AI"
                >
                    <MessageCircle size={14} />
                    <span className="hidden sm:inline">Ask AI</span>
                </Button>
            </div>
        </div>
    )
}

export default DashboardHeader