import { FileText, RotateCcw, X } from "lucide-react"
import Button from "../../../components/ui/Button"
import { motion } from "framer-motion"

function SelectedFiles({ files, removeFile, resetAll }: { files: any[], removeFile: (id: string) => void, resetAll: () => void }) {
    return (
        <div>
            <div className="mb-3 flex justify-between">
                <h3 className="text-sm font-semibold">Selected Documents</h3>
                <div className="flex gap-3">
                    <Button
                        size="sm"
                        variant="secondary"
                        onClick={resetAll}
                    >
                        <RotateCcw size={14} />
                        Reset
                    </Button>
                </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
                {files.map(({ file, id }) => (
                    <motion.div
                        key={id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="group rounded-xl bg-white/5 p-4"
                    >
                        <div className="flex items-center gap-3">
                            <FileText size={20} className="text-indigo-400" />
                            <span className="flex-1 truncate text-sm">
                                {file.name}
                            </span>
                            <button
                                onClick={() => removeFile(id)}
                                className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-400"
                            >
                                <X size={14} />
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}

export default SelectedFiles