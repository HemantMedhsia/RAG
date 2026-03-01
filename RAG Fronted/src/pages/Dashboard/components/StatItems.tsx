import { StatusItem } from "./StatusItem"

function StatItems({ data }: { data: any }) {
    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <StatusItem
                label="Vector DB"
                value={data.systemStatus.vectorDb}
                ok
            />
            <StatusItem
                label="Embedding Engine"
                value={data.systemStatus.embeddingEngine}
                ok
            />
            <StatusItem
                label="Last Indexing Run"
                value={data.systemStatus.lastIndexingRun}
            />
            <StatusItem
                label="Avg Response Time"
                value={data.systemStatus.avgResponseTime}
            />
        </div>
    )
}

export default StatItems