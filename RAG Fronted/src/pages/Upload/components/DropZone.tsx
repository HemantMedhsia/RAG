import { UploadCloud } from 'lucide-react';

function DropZone({ inputRef, setDragActive, dragActive, processFiles }: {
    inputRef: React.RefObject<HTMLInputElement>;
    setDragActive: React.Dispatch<React.SetStateAction<boolean>>;
    dragActive: boolean;
    processFiles: (files: FileList | null) => void;
}) {
    return (
        <div
            onClick={() => inputRef.current?.click()}
            onDragEnter={() => setDragActive(true)}
            onDragLeave={() => setDragActive(false)}
            onDragOver={(e) => {
                e.preventDefault();
                setDragActive(true);
            }}
            onDrop={(e) => {
                e.preventDefault();
                setDragActive(false);
                processFiles(e.dataTransfer.files);
            }}
            className={`cursor-pointer rounded-xl border-2 border-dashed p-10 text-center transition
              ${dragActive
                    ? "border-indigo-500 bg-indigo-500/10"
                    : "border-white/10 bg-white/5 hover:border-indigo-500/40"
                }
            `}
        >
            <UploadCloud size={42} className="mx-auto mb-4 text-indigo-400" />
            <p className="text-sm font-medium text-gray-300">
                Drag & drop documents
            </p>
            <p className="mt-1 text-xs text-gray-500">
                PDF or DOCX (max 10MB)
            </p>

            <input
                ref={inputRef}
                type="file"
                multiple
                accept=".pdf,.docx"
                className="hidden"
                onChange={(e) => processFiles(e.target.files)}
            />
        </div>
    )
}

export default DropZone