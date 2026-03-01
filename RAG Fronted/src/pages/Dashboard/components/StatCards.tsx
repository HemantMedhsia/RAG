import { FileText, Layers, MessageSquare } from "lucide-react"
import { StatCard } from "./StatCard"

function StatCards({ data }: { data: any }) {
    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <StatCard
                icon={FileText}
                label="Documents Indexed"
                value={data.stats.documentsIndexed}
                hint="PDF & DOCX"
            />
            <StatCard
                icon={Layers}
                label="Total Chunks"
                value={data.stats.totalChunks}
                hint="Vector embeddings"
            />
            <StatCard
                icon={MessageSquare}
                label="Queries Asked"
                value={data.stats.queriesAsked}
                hint="Across all chats"
            />
        </div>
    )
}

export default StatCards