import { X, FileText } from "lucide-react";
import { useChatContext } from "../context/ChatContext";

type Doc = {
  id: number;
  fileName: string;
};

export default function DocSelectModal({
  documents,
  onClose,
}: {
  documents: Doc[];
  onClose: () => void;
}) {
  const { chatMode, selectedDocs, setSelectedDocs } = useChatContext();

  const toggle = (docId: number) => {
    if (chatMode === "DOCUMENT") {
      setSelectedDocs([docId]);
      onClose();
      return;
    }

    setSelectedDocs((prev) =>
      prev.includes(docId)
        ? prev.filter((id) => id !== docId)
        : [...prev, docId]
    );
  };

  return (
    /* BACKDROP */
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60"
      onClick={onClose}
    >
      {/* MODAL */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="
          w-full
          max-w-xl
          rounded-xl
          bg-[#0E1320]
          p-5
          shadow-2xl
          transition-all
          duration-200
        "
      >
        {/* HEADER */}
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-100">
            Select Documents
          </h3>
          <button
            onClick={onClose}
            className="rounded-md p-1 hover:bg-white/10"
          >
            <X size={16} />
          </button>
        </div>

        {/* DOC LIST */}
        <div className="max-h-72 space-y-2 overflow-y-auto">
          {documents.map((doc) => {
            const active = selectedDocs.includes(doc.id);

            return (
              <div
                key={doc.id}
                onClick={() => toggle(doc.id)}
                className={`flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-sm transition
                  ${
                    active
                      ? "bg-indigo-500/20 text-indigo-300"
                      : "hover:bg-white/5 text-gray-300"
                  }
                `}
              >
                <div className="flex items-center gap-2">
                  <FileText size={14} />
                  <span className="truncate">{doc.fileName}</span>
                </div>

                {active && (
                  <span className="text-xs text-indigo-300">Selected</span>
                )}
              </div>
            );
          })}
        </div>

        {/* FOOTER */}
        <button
          onClick={onClose}
          className="mt-4 w-full rounded-lg bg-indigo-600 py-2 text-sm text-white transition hover:bg-indigo-500"
        >
          Done
        </button>
      </div>
    </div>
  );
}
