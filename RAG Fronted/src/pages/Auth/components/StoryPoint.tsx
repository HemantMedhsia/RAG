export function StoryPoint({
  icon: Icon,
  title,
  desc,
}: {
  icon: any;
  title: string;
  desc: string;
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="rounded-lg bg-indigo-500/15 p-2 text-indigo-400">
        <Icon size={18} />
      </div>
      <div>
        <p className="font-medium text-gray-200">{title}</p>
        <p className="text-xs text-gray-400">{desc}</p>
      </div>
    </div>
  );
}