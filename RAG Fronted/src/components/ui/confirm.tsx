import { createRoot } from "react-dom/client";
import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";
import Button from "./Button";

type ConfirmOptions = {
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  danger?: boolean;
};

export function confirm({
  title = "Are you sure?",
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  danger = false,
}: ConfirmOptions): Promise<boolean> {
  return new Promise((resolve) => {
    const container = document.createElement("div");
    document.body.appendChild(container);
    const root = createRoot(container);

    const cleanup = () => {
      root.unmount();
      container.remove();
    };

    const onConfirm = () => {
      cleanup();
      resolve(true);
    };

    const onCancel = () => {
      cleanup();
      resolve(false);
    };

    root.render(
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur"
        >
          <motion.div
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="w-full max-w-md rounded-2xl border border-white/10 bg-[#0E1320] p-6 text-center shadow-2xl"
          >
            {/* ICON */}
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10 text-red-400">
              <AlertTriangle size={22} />
            </div>

            {/* TITLE */}
            <h3 className="text-lg font-semibold text-gray-200">
              {title}
            </h3>

            {/* MESSAGE */}
            <p className="mt-2 text-sm leading-relaxed text-gray-400">
              {message}
            </p>

            {/* ACTIONS */}
            <div className="mt-6 flex justify-center gap-3">
              <Button
                variant="secondary"
                size="sm"
                onClick={onCancel}
              >
                {cancelText}
              </Button>

              <Button
                size="sm"
                className={
                  danger
                    ? "bg-red-500/90 hover:bg-red-500"
                    : ""
                }
                onClick={onConfirm}
              >
                {confirmText}
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  });
}
