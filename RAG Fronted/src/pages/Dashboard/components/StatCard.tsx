import Card from "../../../components/ui/Card";

export function StatCard({
  icon: Icon,
  label,
  value,
  hint,
}: {
  icon: any;
  label: string;
  value: number | string;
  hint: string;
}) {
  return (
    <Card className="flex items-center gap-4">
      <div className="rounded-xl bg-indigo-500/15 p-3 text-indigo-400">
        <Icon size={22} />
      </div>
      <div>
        <p className="text-xs text-gray-400">{label}</p>
        <p className="text-2xl font-semibold text-gray-200">
          {value}
        </p>
        <p className="text-xs text-gray-500">{hint}</p>
      </div>
    </Card>
  );
}