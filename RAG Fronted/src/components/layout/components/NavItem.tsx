export function NavItem({
    icon: Icon,
    label,
    onClick,
}: {
    icon: any;
    label: string;
    onClick: () => void;
}) {
    return (
        <div
            onClick={onClick}
            className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm text-indigo-50 hover:bg-white/10"
        >
            <Icon size={18} />
            {label}
        </div>
    );
}