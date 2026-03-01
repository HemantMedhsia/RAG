import Card from '../../../components/ui/Card'
import { Activity } from 'lucide-react'
import StatItems from './StatItems'

function SystemStatus({ data }: { data: any }) {
    return (
        <Card className="lg:col-span-2">
            <div className="mb-4 flex items-center gap-2">
                <Activity size={18} className="text-indigo-400" />
                <h3 className="text-sm font-semibold">System Status</h3>
            </div>
            <StatItems data={data} />
        </Card>
    )
}

export default SystemStatus