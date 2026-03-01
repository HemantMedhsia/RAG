import { useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useAiToast } from "../../components/context/AiToastContext";
import KnowledgeBaseModal from "./components/KnowledgeBaseModal";
import type { UploadedFile } from "./types/types";
import DropZone from "./components/DropZone";
import UploadStat from "./components/UploadStat";
import SelectedFiles from "./components/SelectedFiles";
import UploadActions from "./components/UploadActions";
import api from "../../api/api";

export default function Upload() {
  const inputRef = useRef<HTMLInputElement>(null!);
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [kbOpen, setKbOpen] = useState(false);

  const toast = useAiToast();

  const processFiles = (list: FileList | null) => {
    if (!list) return;

    const validFiles = Array.from(list).filter((f) =>
      [
        "application/pdf",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ].includes(f.type),
    );

    const mapped = validFiles.map((file) => ({ file, id: crypto.randomUUID(), }));
    setFiles((prev) => [...prev, ...mapped]);
    if (inputRef.current) inputRef.current.value = "";
  };

  const removeFile = (id: string) => setFiles((prev) => prev.filter((f) => f.id !== id));
  const resetAll = () => setFiles([]);

  const handleUpload = async () => {
    if (files.length === 0) {
      toast({
        title: "No files selected",
        message: "Please select at least one document.",
        type: "warning",
      });
      return;
    }

    if (files.length > 5) {
      toast({
        title: "Too many files",
        message: "Maximum 5 documents allowed.",
        type: "error",
      });
      return;
    }

    if (files.some((f) => f.file.size > 10 * 1024 * 1024)) {
      toast({
        title: "File too large",
        message: "Each file must be under 10MB.",
        type: "error",
      });
      return;
    }

    const formData = new FormData();
    files.forEach(({ file }) => {
      formData.append("files", file, file.name);
    });

    try {
      setUploading(true);

      await api.post("documents/upload", formData, {
        headers: { "Content-Type": undefined },
      });

      toast({
        title: "Upload successful",
        message: `${files.length} document(s) indexed.`,
        type: "success",
      });

      resetAll();
    } catch (err: any) {
      const message =
        err?.response?.data?.message ||
        err?.response?.data ||
        "Upload failed";

      toast({
        title: "Upload failed",
        message,
        type: "error",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <UploadStat files={files} />
        <div className="lg:col-span-2 space-y-6">
          <DropZone
            inputRef={inputRef}
            setDragActive={setDragActive}
            dragActive={dragActive}
            processFiles={processFiles}
          />

          {files.length > 0 && (
            <SelectedFiles files={files} removeFile={removeFile} resetAll={resetAll} />
          )}
          <UploadActions handleUpload={handleUpload} uploading={uploading} setKbOpen={setKbOpen} />
        </div>
      </div>

      <AnimatePresence>
        {kbOpen && <KnowledgeBaseModal onClose={() => setKbOpen(false)} />}
      </AnimatePresence>
    </>
  );
}