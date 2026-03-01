export function ModeButton({
    icon: Icon,
    label,
    active,
    onClick,
}: {
    icon: any;
    label: string;
    active: boolean;
    onClick: () => void;
}) {
    return (
        <div
            onClick={onClick}
            className={`flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm transition
        ${active
                    ? "bg-white/25 text-white"
                    : "text-indigo-50 hover:bg-white/10"
                }`}
        >
            <Icon size={16} />
            {label}
        </div>
    );
}