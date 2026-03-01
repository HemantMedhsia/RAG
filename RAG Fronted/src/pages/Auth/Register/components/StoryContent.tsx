import { motion } from "framer-motion"
import { StoryPoint } from "../../components/StoryPoint"
import { Cpu, Database, ShieldCheck } from "lucide-react"

function StoryContent() {
    return (
        <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="absolute right-0 top-0 z-10 max-w-lg px-16 py-24"
        >
            <div className="mb-10 text-3xl font-semibold tracking-tight">
                RAG<span className="text-[#0B0F1A]">Lux</span>
            </div>

            <h1 className="mb-8 text-4xl font-bold leading-tight">
                Create intelligence
                <br />
                <span className="text-[#0B0F1A]">from your knowledge</span>
            </h1>

            <div className="space-y-6 text-sm text-gray-400">
                <StoryPoint
                    icon={Database}
                    title="Bring your documents"
                    desc="PDFs, notes, reports — everything in one brain."
                />
                <StoryPoint
                    icon={Cpu}
                    title="Ask like a human"
                    desc="No prompts. No tricks. Just questions."
                />
                <StoryPoint
                    icon={ShieldCheck}
                    title="Private by design"
                    desc="Your data is isolated, encrypted, and yours."
                />
            </div>

            <div className="mt-10 border-l-2 border-indigo-500 pl-4 text-xs italic text-gray-900">
                “Knowledge becomes powerful when it can respond.”
            </div>
        </motion.div>
    )
}

export default StoryContent