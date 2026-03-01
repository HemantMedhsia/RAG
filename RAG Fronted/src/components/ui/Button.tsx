import { motion } from "framer-motion";
import { cn } from "../../utils/cn";

type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md";
  className?: string;
} & Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  | "onDrag"
  | "onDragStart"
  | "onDragEnd"
  | "onAnimationStart"
  | "onAnimationEnd"
  | "onAnimationIteration"
>;

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.02 } : undefined}
      whileTap={!disabled ? { scale: 0.98 } : undefined}
      transition={{ duration: 0.2 }}
      disabled={disabled}
      className={cn(
        "rounded-xl text-sm font-medium transition-all inline-flex items-center gap-2 justify-center",
        /* ---------- SIZE ---------- */
        size === "sm" && "px-3 py-1.5 text-xs",
        size === "md" && "px-5 py-2.5",

        /* ---------- VARIANTS ---------- */
        variant === "primary" &&
        "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20 hover:bg-indigo-500",

        variant === "secondary" &&
        "border border-white/10 bg-white/5 text-gray-200 hover:bg-white/10",

        variant === "ghost" &&
        "text-gray-300 hover:bg-white/5",

        /* ---------- DISABLED ---------- */
        disabled &&
        "opacity-50 cursor-not-allowed hover:bg-none hover:scale-100",

        className,
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
}
