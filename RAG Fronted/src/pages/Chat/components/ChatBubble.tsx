import { Bot, Copy, Sparkles, User } from "lucide-react";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import type { Message } from "../types/types";

export function ChatBubble({ message }: { message: Message }) {
    const isUser = message.role === "user";

    return (
        <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className={`flex w-full ${isUser ? "justify-end" : "justify-start"}`}
        >
            {/* BOT AVATAR */}
            {!isUser && (
                <div className="mr-3 mt-1 flex h-8 w-8 items-center justify-center rounded-md bg-indigo-500/15 text-indigo-400">
                    <Bot size={16} />
                </div>
            )}

            <div className="max-w-[70%]">
                {/* MESSAGE BUBBLE */}
                <div
                    className={`rounded-2xl px-5 py-4 text-sm leading-relaxed ${isUser
                        ? `
                bg-indigo-600/50 text-white
                rounded-br-md
                shadow-md shadow-indigo-600/20
              `
                        : `
                bg-white/5 text-gray-200
                border border-white/10
                backdrop-blur
                rounded-bl-md
              `
                        }`}
                >
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm, remarkBreaks]}
                        components={{
                            ul: ({ children }) => (
                                <ul className="ml-6 list-disc space-y-1">{children}</ul>
                            ),
                            ol: ({ children }) => (
                                <ol className="ml-6 list-decimal space-y-1">{children}</ol>
                            ),
                            li: ({ children }) => (
                                <li className="leading-relaxed">{children}</li>
                            ),
                            h3: ({ children }) => (
                                <h3 className="mb-2 text-base font-semibold">{children}</h3>
                            ),
                            p: ({ children }) => (
                                <p className="mb-2 leading-relaxed">{children}</p>
                            ),
                        }}
                    >
                        {message.content}
                    </ReactMarkdown>

                </div>

                {/* META */}
                <div
                    className={`mt-1 flex items-center gap-3 text-[10px] ${isUser ? "justify-end text-indigo-200" : "text-gray-400"
                        }`}
                >
                    <span>{message.time}</span>

                    {!isUser && (
                        <>
                            <span className="flex items-center gap-1 text-indigo-300">
                                <Sparkles size={10} />
                                grounded
                            </span>

                            <button
                                onClick={() =>
                                    navigator.clipboard.writeText(message.content)
                                }
                                className="flex items-center gap-1 hover:text-indigo-400"
                            >
                                <Copy size={10} />
                                copy
                            </button>
                        </>
                    )}
                </div>
            </div>

            {/* USER AVATAR */}
            {isUser && (
                <div className="ml-3 mt-1 flex h-8 w-8 items-center justify-center rounded-md bg-indigo-500/15 text-indigo-400">
                    <User size={16} />
                </div>
            )}
        </motion.div>
    );
}