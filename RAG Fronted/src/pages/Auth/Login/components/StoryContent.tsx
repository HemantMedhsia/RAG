import { motion } from "framer-motion"
import { FileSearch, Brain, MessageSquare } from "lucide-react"
import { StoryPoint } from "../../components/StoryPoint"

function StoryContent() {
    return (
        <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative z-10 max-w-lg px-14 py-20"
        >
            <div className="mb-10 text-3xl font-semibold tracking-tight">
                RAG<span className="text-indigo-400">Lux</span>
            </div>

            <h1 className="mb-8 ml-8 text-4xl font-bold leading-tight">
                Your documents,
                <br />
                now they can
                <span className="text-indigo-400"> answer back</span>
            </h1>

            <div className="ml-8 space-y-6 text-sm text-gray-400">
                <StoryPoint
                    icon={FileSearch}
                    title="Stop searching"
                    desc="Ask questions instead of scanning files."
                />
                <StoryPoint
                    icon={Brain}
                    title="AI with memory"
                    desc="Context-aware answers, grounded in data."
                />
                <StoryPoint
                    icon={MessageSquare}
                    title="Talk naturally"
                    desc="No prompts, no syntax, just questions."
                />
            </div>

            <div className="ml-8 mt-10 border-l-2 border-indigo-500 pl-4 text-xs italic text-gray-500">
                “The fastest way to understand documents is to talk to them.”
            </div>
        </motion.div>
    )
}

export default StoryContent