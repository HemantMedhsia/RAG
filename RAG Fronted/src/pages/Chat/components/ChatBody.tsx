
import { AnimatePresence, motion } from 'framer-motion'
import Card from '../../../components/ui/Card'
import { TypingIndicator } from './TypingIndicator'
import { Bot } from 'lucide-react'
import { ChatBubble } from './ChatBubble'

function ChatBody({ messages, loading, bottomRef }: { messages: any[], loading: boolean, bottomRef: any }) {
    return (
        <Card className="flex-1 overflow-y-auto space-y-6">
            {messages.length === 0 && !loading && (
                <div className="relative flex h-full items-center justify-center overflow-hidden">
                    <motion.div
                        className="absolute h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl"
                        animate={{
                            scale: [1, 1.15, 1],
                            opacity: [0.3, 0.5, 0.3],
                        }}
                        transition={{
                            duration: 6,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />

                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="relative z-10 flex flex-col items-center text-center"
                    >
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            className="mb-4 text-indigo-400/70"
                        >
                            <Bot size={56} />
                        </motion.div>

                        <motion.p
                            animate={{ opacity: [0.6, 1, 0.6] }}
                            transition={{
                                duration: 5,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            className="text-sm font-medium text-gray-300"
                        >
                            Ask questions grounded in your documents
                        </motion.p>

                        <p className="mt-1 max-w-sm text-xs text-gray-500">
                            Choose chat mode, select documents, and get precise answers with
                            contextual understanding.
                        </p>
                    </motion.div>
                </div>
            )}

            <AnimatePresence>
                {messages.map((msg) => (
                    <ChatBubble key={msg.id} message={msg} />
                ))}
            </AnimatePresence>

            {loading && <TypingIndicator />}

            <div ref={bottomRef} />
        </Card>
    )
}

export default ChatBody