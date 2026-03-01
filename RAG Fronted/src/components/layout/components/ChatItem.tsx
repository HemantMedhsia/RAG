import { MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";
export function ChatItem({
    chat,
    active,
}: {
    chat: any;
    active?: boolean;
}) {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(`/chat?conversationId=${chat.id}`)}
            className={`group relative cursor-pointer rounded-xl p-3 transition-all duration-200 ${active
                ? "bg-indigo-500/20 ring-1 ring-indigo-400/40"
                : "hover:bg-white/5"
                }`}
        >
            {active && (<span className="absolute left-0 top-3 h-8 w-1 rounded-r bg-indigo-400" />)}
            <div className="flex items-start gap-3">
                <div className={`mt-1 rounded-md p-1 ${active ? "bg-indigo-400/20" : "bg-white/10"}`}>
                    <MessageSquare size={14} />
                </div>

                <div className="min-w-0 flex-1">
                    <div className={`truncate text-sm ${active ? "font-semibold text-white" : "text-indigo-50"}`}>
                        {chat.title || "Untitled chat"}
                    </div>

                    <div className="mt-0.5 text-xs text-gray-500">
                        {chat.scope} · {new Date(chat.createdAt).toLocaleDateString()}
                    </div>
                </div>
            </div>
        </div>
    );
}