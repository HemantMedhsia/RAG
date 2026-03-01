export function StatusItem({ label, value, ok, }:
    { label: string; value: string; ok?: boolean; }) {
    return (
        <div className="rounded-lg bg-white/5 p-3">
            <p className="text-xs text-gray-400">{label}</p>
            <p className={`text-sm font-medium ${ok ? "text-green-400" : "text-gray-200"}`}>{value}</p>
        </div>
    );
}