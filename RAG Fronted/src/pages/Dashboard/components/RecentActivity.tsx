import Card from '../../../components/ui/Card'
import { Clock } from 'lucide-react'

function RecentActivity({ data }: { data: any }) {
    return (
        <Card>
            <div className="mb-4 flex items-center gap-2">
                <Clock size={18} className="text-indigo-400" />
                <h3 className="text-sm font-semibold">
                    Recent Activity
                </h3>
            </div>

            <ul className="space-y-3 text-sm text-gray-400">
                {data.recentActivity.map((item: string, i: number) => (
                    <li key={i}>• {item}</li>
                ))}
            </ul>
        </Card>
    )
}

export default RecentActivity