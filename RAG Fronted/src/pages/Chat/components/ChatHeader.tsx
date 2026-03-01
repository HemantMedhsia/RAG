import { Plus, RotateCcw, Sparkles } from 'lucide-react'
import Button from '../../../components/ui/Button'

function ChatHeader({ messages, regenerateLast, handleNewChat }:
    { messages: any[], regenerateLast: () => void, handleNewChat: () => void }) {
    return (
        <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur">
            <div>
                <h2 className="flex items-center gap-2 text-sm font-semibold text-gray-200">
                    <Sparkles size={14} className="text-indigo-400" />
                    RAG Chat
                </h2>
                <p className="text-xs text-gray-500">
                    Context-aware AI answers from your documents
                </p>
            </div>

            <div className="flex items-center gap-2">
                {messages.length > 0 && (
                    <Button
                        variant="secondary"
                        onClick={regenerateLast}
                        className="group flex items-center gap-2 px-3 py-2 text-gray-300 hover:text-white"
                        aria-label="Regenerate response"
                    >
                        <RotateCcw size={14} />
                        <span className="hidden sm:inline text-sm">Regenerate</span>
                    </Button>
                )}

                <Button
                    onClick={handleNewChat}
                    className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-2 shadow-md"
                    aria-label="Start new chat"
                >
                    <Plus size={14} />
                    <span className="hidden sm:inline text-sm">
                        New Chat
                    </span>
                </Button>
            </div>
        </div>
    )
}

export default ChatHeader