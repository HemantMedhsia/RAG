import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FileText, X } from "lucide-react";
import { useAiToast } from "../../../components/context/AiToastContext";
import Button from "../../../components/ui/Button";
import { confirm } from "../../../components/ui/confirm";
import api from "../../../api/api";
import type { ExistingDocument } from "../types/types";
import { formatFileSize } from "../../../utils/helper";

export default function KnowledgeBaseModal({
    onClose,
}: {
    onClose: () => void;
}) {
    const [documents, setDocuments] = useState<ExistingDocument[]>([]);
    const [loading, setLoading] = useState(false);
    const [deletingId, setDeletingId] = useState<number | null>(null);

    const toast = useAiToast();

    const fetchDocuments = async () => {
        try {
            setLoading(true);
            const res = await api.get("documents/get-all-docs");
            setDocuments(res.data.data);
        } catch (err: any) {
            toast({
                title: "Failed to load documents",
                message: err?.response?.data?.message || "Could not fetch knowledge base files.",
                type: "error",
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDocuments();
    }, []);

    const deleteDocument = async (id: number, name: string) => {
        const ok = await confirm({
            title: "Remove document?",
            message: `“${name}” will be removed from your knowledge base.`,
            confirmText: "Yes, remove it",
            cancelText: "Keep it",
            danger: true,
        });

        if (!ok) return;

        try {
            setDeletingId(id);
            await api.delete(`documents/${id}`);

            setDocuments((prev) => prev.filter((d) => d.id !== id));

            toast({
                title: "Document deleted",
                message: `"${name}" removed successfully.`,
                type: "success",
            });
        } catch {
            toast({
                title: "Delete failed",
                message: "Could not delete document.",
                type: "error",
            });
        } finally {
            setDeletingId(null);
        }
    };

    return (
        <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <motion.div
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 20 }}
                transition={{ duration: 0.25 }}
                className="w-full max-w-xl rounded-xl border border-white/10 bg-[#0E1320] p-5"
            >
                <div className="mb-4 flex items-center justify-between">
                    <div>
                        <h3 className="text-sm font-semibold text-gray-200">
                            Knowledge Base
                        </h3>
                        <p className="text-xs text-gray-500">
                            Documents used for answering questions
                        </p>
                    </div>

                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-200"
                    >
                        <X size={16} />
                    </button>
                </div>

                {loading ? (
                    <p className="text-xs text-gray-500">Loading documents…</p>
                ) : documents.length === 0 ? (
                    <p className="text-xs text-gray-500">
                        No documents in knowledge base
                    </p>
                ) : (
                    <div className="max-h-72 space-y-2 overflow-y-auto pr-1">
                        {documents.map((doc) => (
                            <div
                                key={doc.id}
                                className="flex items-center justify-between rounded-lg bg-white/5 px-3 py-2"
                            >
                                <div className="flex items-start gap-3 min-w-0">
                                    <FileText
                                        size={16}
                                        className="mt-0.5 shrink-0 text-indigo-400"
                                    />

                                    <div className="min-w-0">
                                        <p className="truncate text-sm text-gray-200">
                                            {doc.fileName}
                                        </p>

                                        <div className="mt-1">
                                            <span className="inline-flex items-center rounded-full bg-indigo-500/15 px-2 py-0.5 text-[10px] font-medium text-indigo-400">
                                                {formatFileSize(doc.size)}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={() => deleteDocument(doc.id, doc.fileName)}
                                    disabled={deletingId === doc.id}
                                    className="ml-3 text-gray-400 hover:text-red-400 transition"
                                    title="Delete document"
                                >
                                    {deletingId === doc.id ? "…" : <X size={14} />}
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                <div className="mt-4">
                    <Button className="w-full" onClick={onClose}>
                        Close
                    </Button>
                </div>
            </motion.div>
        </motion.div>
    );
}
