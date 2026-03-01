export function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-6">
      <div className="mb-2 text-xs uppercase tracking-wide text-indigo-100/80">
        {title}
      </div>
      {children}
    </div>
  );
}