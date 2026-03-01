import { motion } from "framer-motion"

function OutletLoader({title = "Loading...", description = "Please wait while we load the content for you."}: { title?: string, description?: string }) {
    return (
        <div className="flex h-[70vh] items-center justify-center">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center gap-4 text-center"
            >
                <p className="text-lg font-medium text-gray-300">{title}</p>
                <p className="max-w-sm text-sm text-gray-500">{description}</p>

                <div className="mt-2 h-1 w-40 overflow-hidden rounded-full bg-white/10">
                    <motion.div
                        className="h-full w-1/2 bg-indigo-500/60"
                        animate={{ x: ["-100%", "200%"] }}
                        transition={{
                            repeat: Infinity,
                            duration: 1.4,
                            ease: "easeInOut",
                        }}
                    />
                </div>
            </motion.div>
        </div>
    )
}

export default OutletLoader