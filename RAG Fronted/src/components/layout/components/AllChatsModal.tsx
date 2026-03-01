import { X } from "lucide-react";
import { createPortal } from "react-dom";
import { ChatItem } from "./ChatItem";

export function AllChatsModal({
    chats,
    activeId,
    onClose,
}: {
    chats: any[];
    activeId: number | null;
    onClose: () => void;
}) {
    return createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
            <div className="relative z-10 w-130 max-h-[70vh] rounded-2xl bg-[#0E1320]/95 border border-white/10 p-4 shadow-2xl
            flex flex-col">
                <div className="mb-3 flex items-center justify-between">
                    <h2 className="text-sm font-semibold text-white">All conversations</h2>
                    <X size={18} className="cursor-pointer text-gray-400 hover:text-white" onClick={onClose} />
                </div>

                <div className="flex-1 overflow-y-auto space-y-1 pr-1">
                    {chats.map((chat) => (
                        <ChatItem
                            key={chat.id}
                            chat={chat}
                            active={chat.id === activeId}
                        />
                    ))}
                </div>

            </div>
        </div>,
        document.body
    );
}