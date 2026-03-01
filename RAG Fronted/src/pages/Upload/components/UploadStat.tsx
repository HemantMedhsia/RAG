import { Database, Files } from "lucide-react"
import Card from "../../../components/ui/Card"
import { StatCard } from "../../Dashboard/components/StatCard"

function UploadStat({ files }: { files: any }) {
    return (
        <div className="space-y-4">
            <StatCard icon={Files} label="Selected Docs" value={files.length} hint="" />
            <StatCard icon={Database} label="Knowledge Base" value="Ready" hint="All documents indexed" />

            <Card>
                <h3 className="mb-2 text-sm font-semibold">How it works</h3>
                <ul className="space-y-1 text-xs text-gray-400">
                    <li>• Upload documents</li>
                    <li>• Chunk & embed</li>
                    <li>• Ask via chat</li>
                </ul>
            </Card>
        </div>
    )
}

export default UploadStat