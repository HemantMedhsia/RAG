import { motion } from "framer-motion"
import Button from "./Button"
function ErrorPagePlaceholder(
    {
        title = "Something went wrong",
        errorMessage = "An unexpected error occurred while loading the content. Please try again.",
        icon = "⚠️" }:
        {
            title?: string,
            errorMessage?: string,
            icon?: React.ReactNode
        }) {
    return (
        <div className="flex h-[70vh] items-center justify-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center gap-4 text-center"
            >
                {/* WATERMARK EMOJI / ICON */}
                <div className="text-6xl opacity-40 select-none">
                    {icon}
                </div>

                {/* MAIN MESSAGE */}
                <p className="text-lg font-medium text-gray-300">
                    {title}
                </p>

                {/* SUB MESSAGE */}
                <p className="max-w-sm text-sm text-gray-500">
                    {errorMessage}
                </p>

                {/* ACTION */}
                <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => window.location.reload()}
                    className="mt-2"
                >
                    Try Again
                </Button>
            </motion.div>
        </div>
    )
}

export default ErrorPagePlaceholder