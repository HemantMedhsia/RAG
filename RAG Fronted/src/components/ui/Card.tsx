import { cn } from "../../utils/cn";

export default function Card({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-xl border border-white/5 bg-white/5 p-5 backdrop-blur",
        className
      )}
    >
      {children}
    </div>
  );
}
