import Button from '../../../components/ui/Button'
import { Send } from 'lucide-react'

function ChatInput({ input, setInput, handleSend, loading }:
    { input: string, setInput: (value: string) => void, handleSend: () => void, loading: boolean }) {
    return (
        <div className="flex gap-2">
            <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ask something intelligent…"
                className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm outline-none placeholder:text-gray-500 focus:border-indigo-500/40"
            />
            <Button onClick={handleSend} disabled={loading}>
                <Send size={16} />
            </Button>
        </div>
    )
}

export default ChatInput