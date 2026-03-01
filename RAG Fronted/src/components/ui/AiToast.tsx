import { motion } from "framer-motion";
import {
  CheckCircle,
  AlertTriangle,
  Info,
  AlertOctagon,
} from "lucide-react";

const iconMap = {
  success: CheckCircle,
  error: AlertOctagon,
  info: Info,
  warning: AlertTriangle,
};

const colorMap = {
  success: "#22ff88", // neon green
  info: "#38bdf8",    // cyan blue
  warning: "#facc15", // amber neon
  error: "#fb7185",   // soft red neon
};

export default function AiToast({
  title,
  message,
  type,
}: {
  title: string;
  message?: string;
  type: "success" | "error" | "info" | "warning";
}) {
  const Icon = iconMap[type];
  const color = colorMap[type];

  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="
        relative overflow-hidden
        w-80 rounded-xl
        border border-white/10
        bg-[#0E1320]/80
        backdrop-blur-xl
      "
      style={{
        boxShadow: `0 0 30px ${color}33`,
      }}
    >
      {/* LEFT AI STRIP */}
      <div
        className="absolute left-0 top-0 h-full w-0.75"
        style={{ backgroundColor: color }}
      />

      {/* SCAN LINE */}
      <motion.div
        animate={{ x: ["-100%", "100%"] }}
        transition={{
          duration: 1.2,
          ease: "linear",
          repeat: Infinity,
        }}
        className="absolute top-0 h-full w-1/2"
        style={{
          background: `linear-gradient(
            to right,
            transparent,
            ${color}22,
            transparent
          )`,
        }}
      />

      <div className="relative z-10 flex gap-3 p-4">
        <Icon
          className="mt-0.5"
          size={20}
          style={{ color }}
        />

        <div>
          <p className="text-sm font-medium text-gray-100">
            {title}
          </p>

          {message && (
            <p className="mt-1 text-xs text-gray-400">
              {message}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
