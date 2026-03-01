import { createContext, useContext, useState } from "react";
import AiToast from "../ui/AiToast";


type ToastType = "success" | "error" | "info" | "warning";

type Toast = {
    id: number;
    title: string;
    message?: string;
    type: ToastType;
};

const ToastContext = createContext<
    (toast: Omit<Toast, "id">) => void
>(() => { });

export function useAiToast() {
    return useContext(ToastContext);
}

export function AiToastProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const showToast = (toast: Omit<Toast, "id">) => {
        const id = Date.now();
        setToasts((prev) => [...prev, { ...toast, id }]);

        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, 3200);
    };

    return (
        <ToastContext.Provider value={showToast}>
            {children}

            {/* TOAST STACK */}
            <div className="fixed top-6 left-1/2 z-9999
    -translate-x-1/2
    flex flex-col items-center
    space-y-3">
                {toasts.map((toast) => (
                    <AiToast key={toast.id} {...toast} />
                ))}
            </div>
        </ToastContext.Provider>
    );
}
